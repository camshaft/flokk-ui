/**
 * Module dependencies
 */
var app = require("..")
  , client = require("../lib/client");

/**
 * SalesController
 */
function SalesController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  client()
    .on("error", onError)
    .end(function(res) {
      // We can't see the sales
      if(!res.body.sales) return;

      res
        .follow("sales")
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemRes = res.body;
          });
        });

    });
};

/**
 * Register it with angular
 */
app.controller("SalesController", [
  '$scope',
  SalesController
]);

/**
 * Let others know where to find it
 */
module.exports = "SalesController";
