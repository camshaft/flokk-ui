/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , client = require("../lib/client");

/*
 * VendorController
 */
function VendorController($scope, $routeParams) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the vendor information
  client
    .get(param.decode($routeParams.vendor))
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.vendorRes = res.body;
      });

      // Get the vendor items listing
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

/*
 * Register it with angular
 */
app.controller(VendorController.name, [
  '$scope',
  '$routeParams',
  VendorController
]);

/*
 * Let others know where to find it
 */
module.exports = VendorController.name;
