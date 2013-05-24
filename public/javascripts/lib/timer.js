/**
 * Module dependencies
 */
var Emitter = require("emitter");

/**
 * Global timer
 */
var currentTime = Math.floor(Date.now()/100)
  , emitter = new Emitter;

setInterval(function() {
  currentTime = Math.floor(Date.now()/1000);
  emitter.emit("update", currentTime);
}, 1000);

module.exports = emitter;
