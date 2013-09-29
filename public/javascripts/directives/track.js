/**
 * Module dependencies
 */

var app = require('..');
var analytics = require('../lib/analytics');

/**
 * track
 */

function track() {
  return {
    link: function($scope, elem, attrs) {

      elem.bind('click', function() {
        var opts = $scope.$eval(attrs.track);
        if (typeof opts === 'string') opts = {event: opts};

        var event = opts.event;
        delete opts.event;

        analytics.track(event, opts);
      });
    }
  };
}

/**
 * Register it with angular
 */

app.directive('track', [
  track
]);

/**
 * Let others know where to find it
 */

module.exports = 'track';
