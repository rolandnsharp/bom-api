var vincenty = require('node-vincenty');
var createDistanceVincentyCallback = require('./createDistanceVincentyCallback');

getLocationDistances = function(lat, lng, location, callback) {

    if (location.lat === 'exceeded limit' || location.lat === "not found") {
        callback(null);
        return;
    }

    vincenty.distVincenty(
        lat,
        lng,
        location.lat,
        location.lng,
        this.createDistanceVincentyCallback(location, callback)
    );
}
module.exports = getLocationDistances;
