/**
 * Module dependencies
 */
var superagent = require("superagent")
  , accessToken = require("../lib/access-token");

// TODO implement with ws

module.exports = function(href, callback) {

  function onError (err) {
    console.error(err);
  }

  return setInterval(function() {
    superagent
      .get(href)
      .set(accessToken.auth())
      .on("error", onError)
      .end(function(res) {
        if(res.ok) callback(res.body);
      });
  }, 10000);
};

module.exports.clear = function(interval) {
  clearInterval(interval);
};
