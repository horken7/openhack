/**
 * Created by Kim on 2017-10-06.
 */
var MAP_API_KEY = "AIzaSyDdeEbc5m6P5em_LlQ92oxsufsCU5hNadE";
var mapCenter = {lat: 61.004627, lng: 14.537272}; //Initial focus of the map
var mapMarkersArray = [];
var heatMapData = [];
var heatmapZoomTresh = 13;


var mapIcons = {
    work: 'icons/work.png',
    home: 'icons/home.png'
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
        styles: mapStyle
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

function addMapMarkers(markers){
    markers.forEach(function (mark) {
        var marker = new google.maps.Marker({
            position: mark.pos,
            icon: mapIcons[mark.type],
            map: map,

            //Custom attributes
            marker_id: mark.id
        });
        marker.addListener('click',function(){
            console.log(marker.marker_id);
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

function toggleHeatmap(){
    heatmap.setMap(heatmap.getMap() ? null : map);
}