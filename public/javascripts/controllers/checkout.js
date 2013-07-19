/**
 * Module dependencies
 */

var app = require('..')
  , each = require('each')
  , start = require('in-progress')
  , client = require('hyperagent')
  , creditCard = require('../directives/credit-card')
  , csc = require('../directives/csc')
  , analytics = require('../lib/analytics')
  , subscribe = require('../lib/subscribe');

/**
 * CheckoutController
 */

function CheckoutController($scope, $location) {
  $scope.$watch(function() {
    return $location.hash();
  }, function(hash) {
    $scope.step = hash || 'shipping';
  });

  $scope.createCard = function(cc) {
    var data = {
      card_number: cc.num,
      name: cc.name,
      expiration_month: cc.month,
      expiration_year: cc.year,
      security_code: cc.csc
    };

    balanced.card.create(data, function(res) {
      // TODO handle bad card
      if (res.status === 402) return;

      // TODO handle errors
      if (res.status !== 201) return;

      client()

      $scope.$apply(function() {
        $location.hash('confirmation');
      });
    });
  };
};

/**
 * Register it with angular
 */

app.controller('CheckoutController', [
  '$scope',
  '$location',
  CheckoutController
]);

/**
 * Let others know where to find it
 */

module.exports = 'CheckoutController';
