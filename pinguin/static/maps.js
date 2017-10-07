/**
 * Created by Kim on 2017-10-06.
 */
var MAP_API_KEY = "AIzaSyDdeEbc5m6P5em_LlQ92oxsufsCU5hNadE";
var mapCenter = {lat: 61.004627, lng: 14.537272};
/**
 * List of map markers where a marker has type (work/home), position (latitude longitude), and a title which is some text
 */
var mapMarkers = [{type: 'home',pos: {lat: 61.014627, lng: 14.538272}, title: '2a 55kvm'},
    {type: 'home',pos: {lat: 61.006627, lng: 14.537472}, title: '3a 75kvn'},
    {type: 'work',pos: {lat: 61.004627, lng: 14.582272}, title: 'kallkökskock'},
    {type: 'work',pos: {lat: 61.026627, lng: 14.589472}, title: 'Skidvallare'}];

var mapIcons = {
    work: '/static/icons/work.png',
    home: '/static/icons/home.png'
};
var map;
/**
 * Styling the map
 */
var mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#cccc3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
    }
];



/**
 * Initialize the map as callback from google script
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: mapCenter,
        styles: mapStyle
    });
    var marker = new google.maps.Marker({
        position: mapCenter,
        map: map
    });


    google.maps.event.addDomListenerOnce(map, 'idle', function () {
        google.maps.event.addDomListener(window, 'resize', function () {
            map.setCenter(mapCenter);
        })
    });
}

function drawMapMarkers(markers){
    markers.forEach(function (mark) {
        var marker = new google.maps.Marker({
            position: mark.pos,
            icon: mapIcons[mark.type],
            map: map

        });
    });

}