/**
 * Module dependencies
 */
var Piecon = require("piecon")
  , favicon = require("favicon");

var piecon = new Piecon()
  , loading = false;

exports.start = function() {
  // piecon.update(0);
  loading = true;
};

exports.update = function(progress) {
  // if(loading) piecon.update(progress);
};

exports.end = function() {
  // favicon.reset();
  loading = false;
};
