getClosestLocation = function(locations) {
    return locations.reduce(function(previous, item) {

        if (!item) {
            return previous;
        }

        if (!previous || (previous && !previous.distance) || item.distance < previous.distance) {
            return item;
        }

        return previous;
    });
}
module.exports = getClosestLocation;
