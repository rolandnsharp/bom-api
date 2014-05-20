var request = require('request');

var IDCodes = {
	tas: 'IDT60801',
	vic: 'IDV60801',
	nsw: 'IDN60801',
	qld: 'IDQ60801',
	sa: 'IDS60801',
	wa: 'IDW60801',
	nt: 'IDD60801',
	act: 'IDN60903'
};

function getBomInfo(stateName, siteNumber, callback) {

	console.log(stateName, siteNumber);
    var url = 'http://www.bom.gov.au/fwo/' + IDCodes[stateName] + '/' + IDCodes[stateName] + '.' + siteNumber + '.json';

    request(url, function(error, response, body) {
    	var data = JSON.parse(body),
    		observationData = data.observations.data[0];

    	var bomInfo = {
    		air_temp: observationData.air_temp,
    		apparent_t: observationData.apparent_t,
    		rel_hum: observationData.rel_hum
    	};

        callback(null, bomInfo);
    });
};

module.exports = getBomInfo;
