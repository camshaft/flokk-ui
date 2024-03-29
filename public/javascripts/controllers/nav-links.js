/**
 * Module dependencies
 */

var app = require('..');
var start = require('in-progress');
var client = require('hyperagent');

/**
 * Load the partials
 */

require('../../partials/nav-links');

/**
 * NavLinksController
 */

function NavLinksController($scope) {
  var done = start();

  function onError(err) {
    console.error(err.stack || err.message || err);
    done();
  }

  client()
    .on('error', onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.root = res.body;
        done();
      });
    });
}

/**
 * Register it with angular
 */

app.controller('NavLinksController', [
  '$scope',
  NavLinksController
]);

/**
 * Let others know where to find it
 */

module.exports = 'NavLinksController';
