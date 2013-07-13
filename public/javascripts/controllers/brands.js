/**
 * Module dependencies
 */

var app = require('..')
  , analytics = require('../lib/analytics')
  , client = require('../lib/client');

/**
 * BrandsController
 */

function BrandsController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

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
          });
        });

    });
};

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
