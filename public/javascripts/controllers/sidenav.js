/**
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , client = require("../lib/client");

/**
 * Load the partials
 */
require("../../partials/sidenav");

/**
 * SidenavController
 */
function SidenavController($scope, $routeParams) {
  $scope.$watch(function() {
    return $routeParams.category;
  }, function(val) {
    $scope.current = param.decode($routeParams.category);
  });

  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  client()
    .on("error", onError)
    .end(function(res) {

      // Expose the root
      $scope.$apply(function() {
        $scope.root = res.body;
      });

      // Fetch the categories
      res
        .follow("categories")
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
app.controller("SidenavController", [
  '$scope',
  '$routeParams',
  SidenavController
]);

/**
 * Let others know where to find it
 */
module.exports = "SidenavController";
