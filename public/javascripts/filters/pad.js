/**
 * Module dependencies
 */

var app = require('..');
var _pad = require('pad');

/**
 * pad
 */

function pad() {
  return function(value, length, padding) {
    return _pad(''+value, length, ''+padding);
  };
}

/**
 * Register it with angular
 */

app.filter('pad', [
  pad
]);

/**
 * Let others know where to find it
 */

module.exports = 'pad';
