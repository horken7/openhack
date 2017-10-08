/**
 * Created by Kim on 2017-10-07.
 */

//Public variables for plotting on the map
var mapTestMarkers;
var mapTestCities;
var work_type;
/**
 * Function that calls the API for cities to make the heatmap
 * @param callback
 */
function makeCitiesApiCall(){
    if(!work_type) work_type = "all";
    var url_heatmap = "http://localhost:8000/pinguin/api/heatmap?occupation=" + work_type;

     $.ajax({
            url: url_heatmap,
            type: "GET",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                mapTestCities = [];
                for(var i = 0; i < response.length; i++){
                    if(response[i].occupation == work_type){
                        var r = response[i];
                        mapTestCities.push({
                            id: r.id,
                            temperature: r.heat,
                            name: r.city,
                            pos: {lat: r.latitude, lng: r.longitude},
                            job: r.occupation
                        });
                    }
                }
                addMapHeatmap(mapTestCities);

            },
            error: function (xhr, status) {
                console.log(status);
            }
        });

    /*mapTestCities = [{id: "gote", temperature: 0.9 ,name: 'Göteborg', pos: {lat: 57.70887000, lng: 11.97456000}, job: 'Rörmockare'},
        {id: "sthlm", temperature: 0.82 ,name: 'Stockholm', pos: {lat: 59.334591, lng:18.063240}, job: 'Snickare'},
        {id: "malmo", temperature: 0.2 ,name: 'Malmö', pos: {lat: 55.607075, lng:13.002716}, job: 'Lärare'},
        {id: "karls", temperature: 0.62 ,name: 'Karlstad', pos: {lat: 59.3793, lng:13.50357}, job: 'Kock'},
        {id: "mora", temperature: 0.4 ,name: 'Mora', pos: {lat: 61.004627, lng: 14.537272}, job: 'Skidvallare'}
    ];*/



}

/**
 * When zoomed in on a city, make request for the markers of that city
 * @param City, lookingFor
 */

function makeMarkersApiCall(city, lookingFor){
    var cityName = "";
    var housingComplete = false;
    var jobsComplete = false;
    mapTestMarkers = [];
    for(var i=0; i < mapTestCities.length; i++){
        if(mapTestCities[i].id == city){
            cityName = mapTestCities[i].name;
        }
    }


    var url_home = "http://localhost:8000/pinguin/api/housing?city=" + cityName;
    $.ajax({
        url: url_home,
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (response) {
            for(var i = 0; i < response.length; i++){
                var r = response[i];
                mapTestMarkers.push({
                    id: r.ad_id,
                    type: "home",
                    pos: {lat: r.latitude, lng: r.longitude},
                    title: r.prize + " kr, " + r.address
                });

        }
        jobsComplete = true;
        if(jobsComplete && housingComplete){
            addMapMarkers(mapTestMarkers);
        }
    },
    error: function (xhr, status) {
        console.log(status);
    }
    });

    url_jobs = "http://localhost:8000/pinguin/api/jobs?city=" + cityName;
    $.ajax({
        url: url_jobs,
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (response) {
            for(var i = 0; i < response.length; i++){
                var r = response[i];
                if(r.type ==work_type){
                    mapTestMarkers.push({
                        id: r.ad_id,
                        type: "work",
                        pos: {lat: r.latitude, lng: r.longitude},
                        title: r.type + ", " + r.company
                    });
                }

        }
        housingComplete = true;
        if(jobsComplete && housingComplete){
            addMapMarkers(mapTestMarkers);
        }
    },
    error: function (xhr, status) {
            console.log(status);
        }
    });
}

function makeArticelApiCall(text, pos, id){
    alert();
    makeAFadApiCall(id);
}

function selectionHandler(work){
    work_type = work;
}


/**
 * Function that calls the AF API with given ad id
 * @param callback
 */
function makeAFadApiCall(ad_id){
    var url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/" + ad_id;
     $.ajax({
            url: url,
            type: "GET",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status) {
                console.log(status);
            }
        });
}