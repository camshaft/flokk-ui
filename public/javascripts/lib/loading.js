/**
 * Module dependencies
 */

var loading = false;

exports.start = function() {
  loading = true;
};

exports.update = function(progress) {

};

exports.end = function() {
  loading = false;
};
