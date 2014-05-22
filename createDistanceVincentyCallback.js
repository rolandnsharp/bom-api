createDistanceVincentyCallback = function(location, callback) {

    return function(distance) {
        callback({
            location: location,
            distance: distance
        });
    };
}
module.exports = createDistanceVincentyCallback;
