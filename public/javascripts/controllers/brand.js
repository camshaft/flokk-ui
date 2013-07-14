/**
 * Module dependencies
 */

var app = require('..')
  , start = require('in-progress')
  , websafe = require('websafe-base64')
  , client = require('hyperagent')
  , analytics = require('../lib/analytics');

/**
 * BrandController
 */

function BrandController($scope, $routeParams) {
  var done = start();

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
    done();
  };

  // Get the brand information
  client
    .get(websafe.decode($routeParams.brand))
    .on('error', onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.brandRes = res.body;
      });

      // Get the brand items listing
      res
        .follow('makesOffer')
        .on('error', onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemsRes = res.body;
            done();
          });
        });
    });
};

/**
 * Register it with angular
 */

app.controller('BrandController', [
  '$scope',
  '$routeParams',
  BrandController
]);

/**
 * Let others know where to find it
 */

module.exports = 'BrandController';
