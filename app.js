var cors = require('cors');
var express = require('express');
var vincenty = require('node-vincenty');
var bomdata = require('./bomdata.json');

var app = express();

app.use(cors());

// app.get('/', function(req, res) {
//     res.send('hello  <br />  /legislators?postcode=4000 <br /> for example.');
// });
//http://localhost:5000/?lat=4000&lng=333

app.get('/', function(request, response) {

    var lat = request.query.lat;
    var lng = request.query.lng;

    // console.log(lat, lng);


    var lastDistance = 0;

    for (var state in bomdata) {

        for (var location in bomdata[state]) {
            // console.log(bomdata[state][location]);
            if (bomdata[state][location].lat === 'exceeded limit' || bomdata[state][location].lat === "not found") {
                //empty
                // console.log(bomdata[state][location].lat);
                // console.log(bomdata[state][location].lng);
            } else {


                vincenty.distVincenty(lat, lng, bomdata[state][location].lat, bomdata[state][location].lng, function(distance) {
                    // console.log(distance);

                    if (lastDistance < distance) {
                        lastDistance = distance;
                        console.log(lastDistance);
                    }
                    // console.log(lastDistance, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");


                });


            }
        }

    }
    console.log(lastDistance, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");


    // if (lat && lng) {


    // response.send({
    //     latitude: lat,
    //     longitude: lng
    // });

    // } else {

    //     response.send({
    //         legislators: 'docs'
    //     });
    // }

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log('Listening on ' + port);
});
