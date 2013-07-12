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

  function onupdate(force) {
    if (typeof force === 'undefined') force = true;

    client()
      .on("error", onError)
      .end(function(res) {
        if(!res.body.cart) return onError(new Error("No cart found"));

        var req = res
          .follow('cart')

        if (force) req.forceLoad();

        req
          .on("error", onError)
          .end(function(res) {
            $scope.$apply(function() {
              $scope.cart = res.body;
            });
          });
      });
  };
  $scope.onupdate = onupdate;
  onupdate(false);
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
