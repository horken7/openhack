/**
 * Created by Kim on 2017-10-07.
 */

//Public variables for plotting on the map
var mapTestMarkers; 
var mapTestCities;

/**
 * Function that calls the API for cities to make the heatmap
 * @param callback
 */
function makeCitiesApiCall(work_type){

    mapTestCities = [{id: "gote", temperature: 0.9 ,name: 'Göteborg', pos: {lat: 57.70887000, lng: 11.97456000}, job: 'Rörmockare'},
        {id: "sthlm", temperature: 0.82 ,name: 'Stockholm', pos: {lat: 59.334591, lng:18.063240}, job: 'Snickare'},
        {id: "malmo", temperature: 0.2 ,name: 'Malmö', pos: {lat: 55.607075, lng:13.002716}, job: 'Lärare'},
        {id: "karls", temperature: 0.62 ,name: 'Karlstad', pos: {lat: 59.3793, lng:13.50357}, job: 'Kock'},
        {id: "mora", temperature: 0.4 ,name: 'Mora', pos: {lat: 61.004627, lng: 14.537272}, job: 'Skidvallare'}
    ];

    addMapHeatmap(mapTestCities);

}

/**
 * When zoomed in on a city, make request for the markers of that city
 * @param City, lookingFor
 */

function makeMarkersApiCall(city, lookingFor){
    switch (city) {
        case "gote":
            mapTestMarkers = [{id: "fst", type: 'home', pos: {lat: 57.70887000, lng: 11.94456000}, title: '2a 55kvm'},
                {id: "snd", type: 'home', pos: {lat: 57.70687000, lng: 11.98456000}, title: '3a 75kvn'},
                {id: "trd", type: 'work', pos: {lat: 57.71887000, lng: 11.99456000}, title: 'kallkökskock'},
                {id: "fth", type: 'work', pos: {lat: 57.72887000, lng: 11.96456000}, title: 'Skidvallare'}];
            break;
        case "sthlm":
            mapTestMarkers = [{id: "fst", type: 'home', pos: {lat: 59.364591, lng:18.003240}, title: '2a 55kvm'},
                {id: "snd", type: 'home', pos: {lat: 59.334591, lng:18.033240}, title: '3a 75kvn'},
                {id: "trd", type: 'work', pos: {lat: 59.344591, lng:18.033240}, title: 'kallkökskock'},
                {id: "fth", type: 'work', pos: {lat: 59.330591, lng:18.013240}, title: 'Skidvallare'}];
            break;
        case "karls":
            mapTestMarkers = [{id: "fst", type: 'home', pos: {lat: 59.3793, lng:13.59357}, title: '2a 55kvm'},
                {id: "snd", type: 'home', pos: {lat: 59.3693, lng:13.51357}, title: '3a 75kvn'},
                {id: "trd", type: 'work', pos: {lat: 59.3893, lng:13.50357}, title: 'kallkökskock'},
                {id: "fth", type: 'work', pos: {lat: 59.3723, lng:13.52357}, title: 'Skidvallare'}];
            break;
        case "malmo":
            mapTestMarkers = [{id: "fst", type: 'home', pos: {lat: 55.607075, lng:13.012716}, title: '2a 55kvm'},
                {id: "snd", type: 'home', pos: {lat: 55.647075, lng:13.12716}, title: '3a 75kvn'},
                {id: "trd", type: 'work', pos: {lat: 55.697075, lng:13.02716}, title: 'kallkökskock'},
                {id: "fth", type: 'work', pos: {lat: 55.787075, lng:13.002716}, title: 'Skidvallare'}];
            break;
        case "mora":
            mapTestMarkers = [{id: "fst", type: 'home', pos: {lat: 61.014627, lng: 14.538272}, title: '2a 55kvm'},
                {id: "snd", type: 'home', pos: {lat: 61.006627, lng: 14.537472}, title: '3a 75kvn'},
                {id: "trd", type: 'work', pos: {lat: 61.004627, lng: 14.582272}, title: 'kallkökskock'},
                {id: "fth", type: 'work', pos: {lat: 61.026627, lng: 14.589472}, title: 'Skidvallare'}];
            break;
    }

    addMapMarkers(mapTestMarkers);
}

function makeArticelApiCall(type, id){
    switch (type) {
        case 'home':
            console.log('Display Home Article For ID: ' + id);
            break;
        case 'work':
            console.log('Display Work Article For ID: ' + id);
            break;
    }
}