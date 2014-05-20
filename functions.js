var bomdata = require('./bomdata.json');
var vincenty = require('node-vincenty');

exports.createDistanceVincentyCallback = function(location, callback) {

    return function (distance) {

        callback({
            location: location,
            distance: distance
        });
    };

}

exports.getLocationDistances = function(lat, lng, location, callback){

    if (location.lat === 'exceeded limit' || location.lat === "not found") {
        callback(null);
        return;
    }

    vincenty.distVincenty(
        lat, 
        lng, 
        location.lat, 
        location.lng, 
        exports.createDistanceVincentyCallback(location, callback)
    );
}

exports.getClosestLocation = function(locations){
    return locations.reduce(function(previous, item){
        if(!item){
            return previous;
        }

        if(!previous || item.distance < previous.distance){
            return item;
        }

        return previous;
    });
}

exports.createWhenDoneCallback = function(count, callback){
    var results = [];

    return function(result){
        results.push(result);
        if(results.length === count){
            callback(results);
        }
    };
}

exports.getLocationDistancesByState = function(lat, lng, stateName, callback){
    // console.log(Object.keys(bomdata).length);

    var state = bomdata[stateName],
        numLocations = Object.keys(state).length;

    var done = exports.createWhenDoneCallback(numLocations, function(results){

        var result = exports.getClosestLocation(results);
        result.state = stateName;
        callback(result);
    });

    for (var locationName in state) {
        exports.getLocationDistances(
            lat,
            lng,
            state[locationName],
            done
        );
    }
}


