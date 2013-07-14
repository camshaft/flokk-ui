/**
 * Module dependencies
 */

var app = require('..')
  , start = require('in-progress')
  , websafe = require('websafe-base64')
  , client = require('hyperagent')
  , analytics = require('../lib/analytics');

/**
 * CategoryController
 */

function CategoryController($scope, $routeParams) {
  var done = start();

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the category information
  client
    .get(websafe.decode($routeParams.category))
    .on('error', onError)
    .end(function(res) {

      // Expose the category info to the view
      $scope.$apply(function() {
        $scope.category = res.body;
        done();
      });
    });
};

/**
 * Register it with angular
 */

app.controller('CategoryController', [
  '$scope',
  '$routeParams',
  CategoryController
]);

/**
 * Let others know where to find it
 */

module.exports = 'CategoryController';
