var url = require('url');
var bomdata = require('./bomdata.json');
var index = require('./index');
var helperFunctions = require('./functions');

module.exports = function(request, response) {

    var parsedUrl = url.parse(request.url, true);

    if (parsedUrl.pathname !== '/') {
	    response.end(null);
	    return;
    }

    var lat = parsedUrl.query.lat;
    var lng = parsedUrl.query.lng;

    var numStates = Object.keys(bomdata).length;

    var done = helperFunctions.createWhenDoneCallback(numStates, function(locations) {
        var closest = helperFunctions.getClosestLocation(locations);

        index.getBomInfo(closest.state, closest.location.siteNumber, function(error, bomInfo) {
            response.end(JSON.stringify(bomInfo));
        });
    });
    for (var stateName in bomdata) {
        helperFunctions.getLocationDistancesByState(
            lat,
            lng,
            stateName,
            done
        );
    }

}
