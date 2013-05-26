/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , superagent = require("../lib/superagent");

/**
 * Load the partials
 */
require("../../partials/sidenav.js");

/*
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

  superagent
    .get("/api")
    .on("error", onError)
    .end(function(res) {

      superagent
        .get(res.body.categories.href)
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.body = res.body;
          });
        });
    });
};

/*
 * Register it with angular
 */
app.controller(SidenavController.name, [
  '$scope',
  '$routeParams',
  SidenavController
]);

/*
 * Let others know where to find it
 */
module.exports = SidenavController.name;
