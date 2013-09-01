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
  // Be able to load this within a route or in a list
  if(!$routeParams.category) return $scope.$watch('categoryLink', function(link) {
    if(link) fetch(link.href, $scope);
  });

  // Fetch the item
  fetch(websafe.decode($routeParams.category), $scope);
};

function fetch (href, $scope) {
  var done = start();

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the category information
  client
    .get(href)
    .on('error', onError)
    .end(function(res) {

      // Expose the category info to the view
      $scope.$apply(function() {
        $scope.category = res.body;
        done();
      });
    });
}

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
