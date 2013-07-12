/**
 * Module dependencies
 */
var app = require("..")
  , analytics = require("../lib/analytics")
  , client = require("../lib/client");

/**
 * CartController
 */
function CartController($scope) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  function onupdate() {
    client()
      .on("error", onError)
      .end(function(res) {
        if(!res.body.cart) return onError(new Error("No cart found"));

        res
          .follow('cart')
          .skipCache()
          .on("error", onError)
          .end(function(res) {
            $scope.$apply(function() {
              $scope.cart = res.body;
            });
          });
      });
  };
  $scope.onupdate = onupdate;
  onupdate();
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
