/**
 * Module dependencies
 */
var client = require("./client")
  , websafe = require("websafe-base64")
  , Emitter = require('emitter');

var events = new Emitter;
var pusher;

function onError (err) {
  console.error(err.stack || err);
}

exports = module.exports = function(href, callback) {
  events.on(href, callback);

  function id() {
    events.off(href, callback);
    if (events.hasListeners(href) || !pusher) return;
    pusher.unsubscribe(websafe.encode(href));
  };

  if (events.listeners(href).length !== 1) return id;

  subscribeToPusher(href, function() {
    console.log('Updating', href);
    client
      .get(href)
      .on("error", onError)
      .end(function(res) {
        events.emit(href, res.body);
      });
  });

  return id;
};

exports.clear = function(id) {
  id();
};

exports.publish = function(href) {
  client
    .get(href)
    .forceLoad()
    .on("error", onError)
    .end(function(res) {
      events.emit(href, res.body);
    });
};

function subscribeToPusher(href, cb) {
  // TODO pull this from the env
  if (!pusher) pusher = new window.Pusher('d49649a56559e77e3bf6');
  var channel = pusher.subscribe(websafe.encode(href));
  channel.bind('update', cb);
};
