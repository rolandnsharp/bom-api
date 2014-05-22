var url = require('url');
var bomdata = require('./bomdata.json');
var indexFunctions = require('./index');


module.exports = function(request, response) {

    var parsedUrl = url.parse(request.url, true);

    if (parsedUrl.pathname !== '/') {
	    response.end(null);
	    return;
    }

    var lat = parsedUrl.query.lat;
    var lng = parsedUrl.query.lng;

    indexFunctions.getBomDataByLatitudeLongitude(lat, lng, function(data){
        response.end(JSON.stringify(data))
    });

}
