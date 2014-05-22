var bomdata = require('./bomdata.json');
var getClosestLocation = require('./getClosestLocation');
var getLocationDistances = require('./getLocationDistances');

getLocationDistancesByState = function(lat, lng, stateName, callback) {
    var state = bomdata[stateName],
        numLocations = Object.keys(state).length;
    var done = createWhenDoneCallback(numLocations, function(results) {
        var result = getClosestLocation(results);
        result.state = stateName;
        callback(result);
    });
    for (var locationName in state) {
        getLocationDistances(
            lat,
            lng,
            state[locationName],
            done
        );
    }
}
module.exports = getLocationDistancesByState;
