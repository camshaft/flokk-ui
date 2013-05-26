/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("../lib/superagent");

/**
 * Load the partials
 */
require("../../partials/nav.js");

/*
 * NavController
 */
function NavController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  superagent
    .get("/api")
    .on("error", onError)
    .end(function(res) {
      if (!res.body) return;

      $scope.$apply(function() {
        $scope.body = res.body;
      });
    });
};

/*
 * Register it with angular
 */
app.controller(NavController.name, [
  '$scope',
  NavController
]);

/*
 * Let others know where to find it
 */
module.exports = NavController.name;
