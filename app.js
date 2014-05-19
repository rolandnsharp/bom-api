//http://localhost:5000/?lat=27&lng=153 query for brisbane

var cors = require('cors');
var express = require('express');
var vincenty = require('node-vincenty');
var bomdata = require('./bomdata.json');
var requestx = require('request');

var app = express();

app.use(cors());


// app.get('/', function(req, res) {
//     res.send('hello  <br />  /legislators?postcode=4000 <br /> for example.');
// });
//http://localhost:5000/?lat=4000&lng=333
var closestData = {
    distance: 9999999999999999999
};

app.get('/', function(request, response) {

    var lat = request.query.lat;
    var lng = request.query.lng;

    function findClosestLocation() {

        var i = 0;
        for (var state in bomdata) {
            i++;

            // console.log(Object.keys(bomdata).length);
            var j = 0;
            for (var location in bomdata[state]) {
                j++;
                // console.log(Object.keys(bomdata[state]).length);


                if (bomdata[state][location].lat === 'exceeded limit' || bomdata[state][location].lat === "not found") {
                    if (Object.keys(bomdata).length === i && Object.keys(bomdata[state]).length === j) {
                        var url = 'http://www.bom.gov.au/fwo/' + closestData.IDCode + '/' + closestData.IDCode + '.' + closestData.siteNumber + '.json';
                        console.log(url);
                        console.log(closestData);
                    }
                } else {

                    vincenty.distVincenty(lat, lng, bomdata[state][location].lat, bomdata[state][location].lng, function(distance) {
                        // console.log(distance);

                        if (closestData.distance > distance) {

                            shortDistance = distance;

                            console.log("*******************");
                            console.log("distance: ",distance);
                            console.log(state);
                            console.log(location);
                            console.log(stateToIDCode(state));
                            console.log("*******************");
                            

                            closestData = {
                                state: state,
                                location: location,
                                siteNumber: bomdata[state][location].siteNumber,
                                distance: distance,
                                IDCode: stateToIDCode(state)
                            };
                        }


                        if (Object.keys(bomdata).length === i && Object.keys(bomdata[state]).length === j) {
                            var url = 'http://www.bom.gov.au/fwo/' + closestData.IDCode + '/' + closestData.IDCode + '.' + closestData.siteNumber + '.json';
                            console.log(url);
                            console.log(closestData);
                        }




                    });

                }
            }

        }
    };


    findClosestLocation();
    // http://www.bom.gov.au/catalogue/data-feeds.shtml

    // requestx(url, function(error, response, body) {




    // console.log(body);

    // });


    // if (lat && lng) {


    // response.send({
    //     latitude: lat,
    //     longitude: lng
    // });

    // } else {

    //     response.send({
    //         legislators: 'docs'
    //     });
    // }

});

function stateToIDCode(state) {
    if (state === 'tas') {
        return "IDT60801";
    } else if (state === 'vic') {
        return "IDV60801";
    } else if (state === 'nsw') {
        return "IDN60801";
    } else if (state === 'qld') {
        return "IDQ60801";
    } else if (state === 'sa') {
        return "IDS60801";
    } else if (state === 'wa') {
        return "IDW60801";
    } else if (state === 'nt') {
        return "IDD60801";
    } else if (state === 'act') {
        return "IDN60903";
    }
};
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log('Listening on ' + port);
});
