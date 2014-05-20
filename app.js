var http = require('http');
var url = require('url');
var bomdata = require('./bomdata.json');
var getBomInfo = require('./getBomInfo');
var f = require('./functions');

var server = http.createServer(function(request, response) {    

var url_parts = url.parse(request.url, true);

    var lat = url_parts.query.lat;
    var lng = url_parts.query.lng;

        numStates = Object.keys(bomdata).length;

    var done = f.createWhenDoneCallback(numStates, function(locations){
        var closest = f.getClosestLocation(locations);
        getBomInfo(closest.state, closest.location.siteNumber, function(error, bomInfo){
            response.end(JSON.stringify(bomInfo));
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
server.listen(port);
console.log('Listening on ' + port);


//http://localhost:5000/?lat=27&lng=153 query for brisbane
// http://www.bom.gov.au/catalogue/data-feeds.shtml