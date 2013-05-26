/**
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , client = require("../lib/client");

/**
 * CategoryController
 */
function CategoryController($scope, $routeParams) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the category information
  client
    .get(param.decode($routeParams.category))
    .on("error", onError)
    .end(function(res) {

      // Expose the category info to the view
      $scope.$apply(function() {
        $scope.category = res.body;
      });
    });
};

/**
 * Register it with angular
 */
app.controller("CategoryController", [
  '$scope',
  '$routeParams',
  CategoryController
]);

/**
 * Let others know where to find it
 */
module.exports = "CategoryController";
