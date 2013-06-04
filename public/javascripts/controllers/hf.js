/**
 * Module dependencies
 */
var app = require("..")
  , client = require("../lib/client");

/**
 * Load the partials
 */
require("../../partials/nav");

/**
 * HFController
 */
function HFController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  client()
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.root = res.body;
      });
    });
};

/**
 * Register it with angular
 */
app.controller("HFController", [
  '$scope',
  HFController
]);

/**
 * Let others know where to find it
 */
module.exports = "HFController";
