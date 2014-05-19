var cors = require('cors');
var express = require('express');
var vincenty = require('node-vincenty');
var bomdata = require('./bomdata.json');
var requestx = require('request');

var app = express();

app.use(cors());

var closestData = {
    distance: 9999999999999999999;
};

function stateToIDCode(state) {
    if (closestData.state === 'tas') {
        return "IDT60801";
    } else if (closestData.state === 'vic') {
        return "IDV60801";
    } else if (closestData.state === 'nsw') {
        return "IDN60801";
    } else if (closestData.state === 'qld') {
        return "IDQ60801";
    } else if (closestData.state === 'sa') {
        return "IDS60801";
    } else if (closestData.state === 'wa') {
        return "IDW60801";
    } else if (closestData.state === 'nt') {
        return "IDD60801";
    } else if (closestData.state === 'act') {
        return "IDN60903"; 
    }
};
// app.get('/', function(req, res) {
//     res.send('hello  <br />  /legislators?postcode=4000 <br /> for example.');
// });
//http://localhost:5000/?lat=4000&lng=333

app.get('/', function(request, response) {

    var lat = request.query.lat;
    var lng = request.query.lng;

    for (var state in bomdata) {
        for (var location in bomdata[state]) {
            if (bomdata[state][location].lat === 'exceeded limit' || bomdata[state][location].lat === "not found") {
                //is empty, do nothing
            } else {

                vincenty.distVincenty(lat, lng, bomdata[state][location].lat, bomdata[state][location].lng, function(distance) {
                    // console.log(distance);

                    if (closestData.distance > distance) {

                        // shortDistance = distance;
                        console.log(state);
                        console.log(location);
                        console.log(closestData.distance);

                        closestData = {
                            state: state,
                            location: location,
                            siteNumber: bomdata[state][location].siteNumber,
                            distance: distance,
                            IDCode: stateToIDCode(state)
                        };
                    }

                });

            }
        }

    }
// http://www.bom.gov.au/catalogue/data-feeds.shtml

    var url = 'http://www.bom.gov.au/fwo/'+closestData.IDCode+'/'+closestData.IDCode+'.'+closestData.siteNumber+'.json';
    // requestx(url, function(error, response, body) {

   
    console.log(url);
    console.log(closestData);

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

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log('Listening on ' + port);
});
