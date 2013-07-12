/**
 * Module dependencies
 */
var client = require("./client")
  , Emitter = require('emitter');

// TODO implement with ws
var events = new Emitter;

var intervals = {};

function onError (err) {
  console.error(err.stack || err);
}

exports = module.exports = function(href, callback) {

  events.on(href, callback);

  var id = {href: href, callback: callback};

  if (events.listeners(href).length !== 1) return id;

  intervals[href] = setInterval(function() {
    client
      .get(href)
      .on("error", onError)
      .end(function(res) {
        if(res.ok) events.emit(href, res.body);
      });
  }, 10000);

  return id;
};

exports.clear = function(id) {
  events.off(id.href, id.callback);
  if (events.hasListeners()) return;
  clearInterval(intervals[id.href]);
  delete intervals[id.href];
};

exports.publish = function(href) {
  client
    .get(href)
    .forceLoad()
    .on("error", onError)
    .end(function(res) {
      if (res.ok) events.emit(href, res.body);
    });
};
