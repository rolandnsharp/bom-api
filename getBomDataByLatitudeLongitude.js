var bomdata = require('./bomdata.json');
var getBomDataBySiteNumberState = require('./getBomDataBySiteNumberState');
var createWhenDoneCallback = require('./createWhenDoneCallback');
var getLocationDistancesByState = require('./getLocationDistancesByState');

function getBomDataByLatitudeLongitude(lat, lng, callback) {
    var numStates = Object.keys(bomdata).length;

    var done = createWhenDoneCallback(numStates, function(locations) {
        var closest = getClosestLocation(locations);
        getBomDataBySiteNumberState(closest.state, closest.location.siteNumber, function(error, bomInfo) {
            callback(bomInfo);
        });
    });
    for (var stateName in bomdata) {
        getLocationDistancesByState(
            lat,
            lng,
            stateName,
            done
        );
    }
}
module.exports = getBomDataByLatitudeLongitude;
