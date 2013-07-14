/**
 * Module dependencies
 */

var app = require('..')
  , analytics = require('../lib/analytics')
  , start = require('in-progress')
  , client = require('hyperagent');

/**
 * SalesController
 */

function SalesController($scope) {
  var done = start();

  function onError(err) {
    console.error(err.stack || err.message || err);
    done();
  };

  client()
    .on('error', onError)
    .end(function(res) {
      // We can't see the sales
      if(!res.body.sales) return;

      res
        .follow('sales')
        .on('error', onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemRes = res.body;
            done();
          });
        });

    });
};

/**
 * Register it with angular
 */

app.controller('SalesController', [
  '$scope',
  SalesController
]);

/**
 * Let others know where to find it
 */

module.exports = 'SalesController';
