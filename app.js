var cors = require('cors');
var express = require('express');
var getBomInfo = require('./getBomInfo');
var f = require('./functions');

var app = express();

app.use(cors());


var closestData = {
    distance: Infinity
};

app.get('/', function(request, response) {

    var lat = request.query.lat,
        lng = request.query.lng,
        
        numStates = Object.keys(bomdata).length;

    var done = f.createWhenDoneCallback(numStates, function(locations){
        var closest = f.getClosestLocation(locations);

        getBomInfo(closest.state, closest.location.siteNumber, function(error, bomInfo){
            response.send(JSON.stringify(bomInfo));
        });

    });

    for (var stateName in bomdata) {
        f.getLocationDistancesByState(
            lat,
            lng,
            stateName,
            done
        );
    }


});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log('Listening on ' + port);
});
// http://www.bom.gov.au/catalogue/data-feeds.shtml
//http://localhost:5000/?lat=27&lng=153 query for brisbane
