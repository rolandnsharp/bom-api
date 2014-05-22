var bomdata = require('./bomdata.json');
var getBomDataBySiteNumberState = require('./getBomDataBySiteNumberState');
var getBomDataByLatitudeLongitude = require('./getBomDataByLatitudeLongitude');

module.exports = {
  getBomDataBySiteNumberState: getBomDataBySiteNumberState,
  getBomDataByLatitudeLongitude: getBomDataByLatitudeLongitude
};
