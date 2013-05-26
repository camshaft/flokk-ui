/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , superagent = require("superagent");

/*
 * VendorController
 */
function VendorController($scope, $routeParams) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the vendor information
  superagent
    .get(param.decode($routeParams.vendor))
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.vendorRes = res.body;
      });

      // Get the vendor items listing
      superagent
        .get(res.body.items.href)
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
