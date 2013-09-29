/**
 * Module dependencies
 */

var app = require('..');
var client = require('hyperagent');

/**
 * Require the directives
 */

require('../directives/credit-card');
require('../directives/csc');

/**
 * CheckoutController
 */

function CheckoutController($scope, $location) {
  $scope.$watch(function() {
    return $location.hash();
  }, function(hash) {
    $scope.step = hash || 'shipping';
  });

  $scope.form = {};

  $scope.createAddress = function(shipping) {
    // TODO save to the api

    // $scope.$apply(function() {
    shipping.saved = true;
    $location.hash('billing');
    // });
  };

  $scope.createCard = function(cc) {
    var data = {
      card_number: cc.num,
      name: cc.name,
      expiration_month: cc.expirationMonth,
      expiration_year: cc.expirationYear,
      security_code: cc.csc
    };

    balanced.card.create(data, function(res) {
      // TODO handle bad card
      if (res.status === 402) return;

      // TODO handle errors
      if (res.status !== 201) return;

      var apiCopy = {
        name: res.data.name,
        hash: res.data.hash,
        additionalType: res.data.brand,
        lastDigits: res.data.last_four,
        url: res.data.uri,
        expirationMonth: res.data.expiration_month,
        expirationYear: res.data.expiration_year
      };

      client()
        .end(function(res) {
          res
            .follow('account')
            .end(function(res) {
              if (!res.body.createCreditCard) return;

              $scope.submit(res.body.createCreditCard, apiCopy, function(err, res) {
                if (err) return console.error(err);

                console.log(res);

                $scope.$apply(function() {
                  cc.saved = true;
                  $location.hash('confirmation');
                });
              });
            });
        });
    });
  };

  $scope.confirm = function() {

  };
}

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
