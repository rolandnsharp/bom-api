createWhenDoneCallback = function(count, callback) {
  var results = [];

  return function(result) {
    results.push(result);
    if (results.length === count) {
      callback(results);
    }
  };
}
module.exports = createWhenDoneCallback;
