/**
 * Module dependencies
 */

var app = require('..');
var start = require('in-progress');
var client = require('hyperagent');

/**
 * BrandsController
 */

function BrandsController($scope) {
  var done = start();

  function onError(err) {
    console.error(err.stack || err.message || err);
    done();
  }

  client()
    .on('error', onError)
    .end(function(res) {
      // We can't see the brands
      if(!res.body.vendors) return;

      res
        .follow('vendors')
        .on('error', onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.body = res.body;
            done();
          });
        });

    });
}

/**
 * Register it with angular
 */

app.controller('BrandsController', [
  '$scope',
  BrandsController
]);

/**
 * Let others know where to find it
 */

module.exports = 'BrandsController';
