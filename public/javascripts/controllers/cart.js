/**
 * Module dependencies
 */

var app = require('..')
  , each = require('each')
  , start = require('in-progress')
  , client = require('hyperagent')
  , analytics = require('../lib/analytics')
  , subscribe = require('../lib/subscribe');

/**
 * CartController
 */

function CartController($scope, $location) {
  var done = start();

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
    done();
  };

  client()
    .on('error', onError)
    .end(function(res) {
      if(!res.body.cart) return onError(new Error('No cart found'));

      res
        .follow('cart')
        .on('error', onError)
        .end(function(res) {
          if (res.error) return onError(new Error(res.text));

          function update(cart) {
            $scope.$apply(function() {
              // TODO use splice on the item list so things don't jump
              $scope.cart = cart;
              $scope.loaded = true;
            });
          };

          update(res.body);
          done();
          var subscription = subscribe(res.body.href, update);

          $scope.$on('$destroy', function() {
            subscribe.clear(subscription);
          });
        });
    });

  $scope.$watch(function() {
    return $location.hash();
  }, function(hash) {
    $scope.step = hash || 'shipping';
  });
};

/**
 * Register it with angular
 */

app.controller('CartController', [
  '$scope',
  '$location',
  CartController
]);

/**
 * Let others know where to find it
 */

module.exports = 'CartController';
