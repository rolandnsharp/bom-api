var bomdata = require('./bomdata.json');
var getLocationDistancesByState = require('./getLocationDistancesByState');
var createWhenDoneCallback = require('./createWhenDoneCallback');
var getBomDataBySiteNumberState = require('./getBomDataBySiteNumberState');
var getBomDataByLatitudeLongitude = require('./getBomDataByLatitudeLongitude');


module.exports = {
  getLocationDistancesByState: getLocationDistancesByState,
  createWhenDoneCallback: createWhenDoneCallback,
  getBomDataBySiteNumberState: getBomDataBySiteNumberState,
  getBomDataByLatitudeLongitude: getBomDataByLatitudeLongitude
};
