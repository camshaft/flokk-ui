/**
 * Module dependencies
 */

var app = require('..');
var enabled = require('feature');

/**
 * feature
 */

function feature() {
  return {
    link: function($scope, elem, attrs) {
      if (!enabled(attrs.feature)) elem.css({display: 'none'});
    }
  }
};

/**
 * Register it with angular
 */

app.directive('feature', [
  feature
]);

/**
 * Let others know where to find it
 */

module.exports = 'feature';
