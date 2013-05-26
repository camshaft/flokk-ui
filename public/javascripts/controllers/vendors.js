/**
 * Module dependencies
 */
var app = require("..")
  , client = require("../lib/client");

/**
 * VendorsController
 */
function VendorsController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  client()
    .on("error", onError)
    .end(function(res) {
      // We can't see the vendors
      if(!res.body.vendors) return;

      res
        .follow("vendors")
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.body = res.body;
          });
        });

    });
};

/**
 * Register it with angular
 */
app.controller("VendorsController", [
  '$scope',
  VendorsController
]);

/**
 * Let others know where to find it
 */
module.exports = "VendorsController";
