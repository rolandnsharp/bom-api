var bomdata = require('./bomdata.json');
var getBomInfo = require('./getBomInfo');
var f = require('./functions');

exports.getClosestWeatherData = function(lat, lng) {
    var numStates = Object.keys(bomdata).length;

    var done = f.createWhenDoneCallback(numStates, function(locations) {
        var closest = f.getClosestLocation(locations);
        getBomInfo(closest.state, closest.location.siteNumber, function(error, bomInfo) {
            console.log(JSON.stringify(bomInfo));
            return JSON.stringify(bomInfo);
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
}

// exports.getClosestWeatherData(22, 22);

//example callback
getBomInfo('vidc', '94693', function(error, bomInfo) {
    if (error){
        console.log("error:", error);
        return;
    }
    console.log(JSON.stringify(bomInfo));
});