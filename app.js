var http = require('http');
var router = require('./router');

var server = http.createServer(router);

var port = Number(process.env.PORT || 5000);
server.listen(port);
console.log('Listening on ' + port);

//http://localhost:5000/?lat=27&lng=153 query for brisbane
// http://www.bom.gov.au/catalogue/data-feeds.shtml
