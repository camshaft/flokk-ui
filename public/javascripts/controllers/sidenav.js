/**
 * Module dependencies
 */

var app = require('..')
  , start = require('in-progress')
  , websafe = require('websafe-base64')
  , client = require('hyperagent');

/**
 * Load the partials
 */

require('../../partials/nav-links');

/**
 * SidenavController
 */

function SidenavController($scope, $routeParams) {
  var done = start();

  $scope.$watch(function() {
    return $routeParams.category;
  }, function(val) {
    $scope.current = websafe.decode($routeParams.category);
  });

  function onError(err) {
    console.error(err.stack || err.message || err);
    done();
  };

  client()
    .on('error', onError)
    .end(function(res) {

      // Expose the root
      $scope.$apply(function() {
        $scope.root = res.body;
      });

      // Fetch the categories
      res
        .follow('categories')
        .on('error', onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.body = res.body;
            done();
          });
        });
    });
};

/**
 * Register it with angular
 */

app.controller('SidenavController', [
  '$scope',
  '$routeParams',
  SidenavController
]);

/**
 * Let others know where to find it
 */

module.exports = 'SidenavController';
