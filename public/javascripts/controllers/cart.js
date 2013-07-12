/**
 * Module dependencies
 */
var app = require("..")
  , analytics = require("../lib/analytics")
  , subscribe = require('../lib/subscribe')
  , client = require("../lib/client");

/**
 * CartController
 */
function CartController($scope) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  client()
    .on("error", onError)
    .end(function(res) {
      if(!res.body.cart) return onError(new Error("No cart found"));

      res
        .follow('cart')
        .on("error", onError)
        .end(function(res) {
          if (res.error) return onError(new Error(res.text));

          function update(cart) {
            $scope.$apply(function() {
              $scope.cart = cart;
            });
          };

          update(res.body);
          var subscription = subscribe(res.body.href, update);

          $scope.$on('$destroy', function() {
            subscribe.clear(subscription);
          });
        });
    });
};

/**
 * Register it with angular
 */
app.controller("CartController", [
  '$scope',
  CartController
]);

/**
 * Let others know where to find it
 */
module.exports = "CartController";
