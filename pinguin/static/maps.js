/**
 * Created by Kim on 2017-10-06.
 *
 *  Colors used in the icon files:
 *      Blue: #2d468d
 *      Green: #2d8d53
 *      Purple: #832d8d
 *      Red: #8d2d38
 *
 */
var MAP_API_KEY = "AIzaSyDdeEbc5m6P5em_LlQ92oxsufsCU5hNadE";
var mapCenter = {lat: 61.004627, lng: 14.537272}; //Initial focus of the map
var mapMarkersArray = [];
var heatMapData = [];
var heatmapZoomTresh = 13;
var iconPath = '/static/icons/';

var mapIcons = {
    work_default: iconPath+'work_blue.png',
    home_default: iconPath+'home_blue.png',
    work_clicked: iconPath+'work_green.png',
    home_clicked: iconPath+'home_green.png'
};
var map, heatmap;
/**
 * Styling the map
 */
var mapStyle = [
    {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#444444"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                color: "#f2f2f2"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: 45
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#46bcec"
            },
            {
                visibility: "on"
            }
        ]
    }
];



/**
 * Initialize the map as callback from google script
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: mapCenter,
        styles: mapStyle,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false

    });

    /* //Center marker, uncomment to more clearly see the initial focus point of the map
    var marker = new google.maps.Marker({
        position: mapCenter,
        map: map
    });
    */

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        map: map
    });

    //Redraw when window changes
    google.maps.event.addDomListenerOnce(map, 'idle', function () {
        google.maps.event.addDomListener(window, 'resize', function () {
            map.setCenter(mapCenter);
        })
    });

    //When zooming in adapt the heatmaps
    map.addListener('zoom_changed', function () {

        if(map.zoom < heatmapZoomTresh) {
            if(!heatmap.getMap()) {
                heatmap.setMap(map);
            }
            //Magical power 3 divided by 6 because it looked like a nice scaling on my computer
            heatmap.set('radius', Math.pow(map.zoom, 3) / 6);
            var newdata = new google.maps.MVCArray(heatMapData);
            heatmap.set('data', newdata);

            removeMapMarkers();

        } else {
            if(heatmap.getMap())
                heatmap.set('map',null);
                //TODO: Figure out a nice way to call with correct markers
                addMapMarkers(mapTestMarkers);
        }
    });

    /**
     * Click listener to enable clicking on heatmaps
     */
    map.addListener('click', function(e){
        var lat = e.latLng.lat();
        var lng = e.latLng.lng();
        var shortestDist = 1000; //Large number
        var shortestPoint = {lat: -1, lng: -1}; //invalid coordinates

        for(var i=0; i < heatMapData.length; i++){
            var dlat = heatMapData[i].location.lat(),
                dlng = heatMapData[i].location.lng();

            var dist = Math.sqrt(Math.pow(lat-dlat,2) + Math.pow(lng-dlng,2));
            if(dist < shortestDist){
                shortestDist = dist;
                shortestPoint.lat = dlat;
                shortestPoint.lng = dlng;

            }
        }

        //if click on heatmap zoom in on it
        if(shortestDist < 1) {
            map.set('center', new google.maps.LatLng(shortestPoint.lat, shortestPoint.lng));
            map.set('zoom', 13)
        }
    });

}


/**
 * @param markersToRemove, optional argument array of id tags used when adding the marker
 * If no parameter is given will clear all markers from the map
 */
function removeMapMarkers(markersToRemove) {

    if(typeof markersToRemove === "undefined") {
        for (var i = 0; i < mapMarkersArray.length; i++) {
            mapMarkersArray[i].setMap(null);
        }
        mapMarkersArray.length = 0;
    } else {
        //Find and remove markers with matching IDs
        for(var j=0; j < markersToRemove.length; j++) {
            for (i = 0; i < mapMarkersArray.length; i++) {
                if (markersToRemove[j] === mapMarkersArray[i].marker_id) {
                    mapMarkersArray[i].setMap(null);
                    mapMarkersArray.splice(i, 1);
                    break; //Found ID
                }
            }
        }
    }
}
/**
 *
 * @param markers, list of markers
 */
function addMapMarkers(markers){
    markers.forEach(function (mark) {
        var marker = new google.maps.Marker({
            position: mark.pos,
            icon: mapIcons[mark.type + "_default"],
            map: map,

            //Custom attributes
            marker_id: mark.id,
            clicked: false
        });
        //On click on a marker
        marker.addListener('click',function(){
            console.log(marker.clicked);
            marker.clicked ? marker.set('icon', mapIcons[mark.type + "_default"]) : marker.set('icon', mapIcons[mark.type + "_clicked"]) ;
            marker.clicked = !marker.clicked;

        });
        mapMarkersArray.push(marker);

    });
}

/**
 *
 * @param cities, array of cities
 */
function addMapHeatmap(cities) {

    cities.forEach(function(city){
        heatMapData.push({
            location: new google.maps.LatLng(city.pos.lat, city.pos.lng),
            weight: city.temperature,
            city_id: city.id
        });
    });



    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ];

    var newdata = new google.maps.MVCArray(heatMapData);
    heatmap.set('data', newdata);
    heatmap.set('gradient', gradient);
    heatmap.set('radius', map.zoom*4);
    heatmap.set('opacity',0.5);
}
