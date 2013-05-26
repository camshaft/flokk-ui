/**
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , client = require("../lib/client");

/**
 * BrandController
 */
function BrandController($scope, $routeParams) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the brand information
  client
    .get(param.decode($routeParams.brand))
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.brandRes = res.body;
      });

      // Get the brand items listing
      res
        .follow("items")
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemsRes = res.body;
          });
        });
    });
};

/**
 * Register it with angular
 */
app.controller("BrandController", [
  '$scope',
  '$routeParams',
  BrandController
]);

/**
 * Let others know where to find it
 */
module.exports = "BrandController";
