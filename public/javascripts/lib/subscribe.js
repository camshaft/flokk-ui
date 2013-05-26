/**
 * Module dependencies
 */
var client = require("./client");

// TODO implement with ws

module.exports = function(href, callback) {

  function onError (err) {
    console.error(err);
  }

  return setInterval(function() {
    client
      .get(href)
      .on("error", onError)
      .end(function(res) {
        if(res.ok) callback(res.body);
      });
  }, 10000);
};

module.exports.clear = function(interval) {
  clearInterval(interval);
};
