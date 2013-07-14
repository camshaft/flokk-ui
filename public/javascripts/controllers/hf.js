/**
 * Module dependencies
 */

var app = require('..')
  , start = require('in-progress')
  , client = require('hyperagent')
  , analytics = require('../lib/analytics');

/**
 * Load the partials
 */

require('../../partials/nav');

/**
 * HFController
 */

function HFController($scope) {
  var done = start();

  function onError(err) {
    console.error(err.stack || err.message || err);
    done();
  };

  client()
    .on('error', onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.root = res.body;
        done();
      });
    });
};

/**
 * Register it with angular
 */

app.controller('HFController', [
  '$scope',
  HFController
]);

/**
 * Let others know where to find it
 */

module.exports = 'HFController';
