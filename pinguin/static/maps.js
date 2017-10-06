/**
 * Created by Kim on 2017-10-06.
 */
var API_KEY = "AIzaSyDdeEbc5m6P5em_LlQ92oxsufsCU5hNadE";
var mapCenter = {lat: 61.004627, lng: 14.537272};
var mapMarkers = [{type: 'home',pos: {lat: 61.014627, lng: 14.538272}},
                    {type: 'home',pos: {lat: 61.006627, lng: 14.537472}},
                    {type: 'work',pos: {lat: 61.004627, lng: 14.582272}},
                    {type: 'work',pos: {lat: 61.026627, lng: 14.589472}}];
var map;

/**
 *
 */
function initMap() {
     map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: mapCenter
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

function drawMapMarkers(positions){
    positions.forEach(function (pos) {
        var marker = new google.maps.Marker({
            position: pos,
            map: map

        });
    });

}