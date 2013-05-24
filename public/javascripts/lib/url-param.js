/**
 * Module dependencies
 */
var base64decode = require("base64-decode")
  , base64encode = require("base64-encode");

// TODO make it url safe

exports.encode = function(url) {
  return base64encode(url);
};

exports.decode = function(url) {
  return base64decode(url);
};