/*
 * Module dependencies
 */
var app = require("..");

/**
 * Load the partials
 */
require("../../partials/footer.js");

/*
 * IndexController
 */
function IndexController($scope, $location) {
  $scope.$watch(function() {
    return $location.path()
  }, function(val) {
    $scope.path = val;
  });

  // TODO expose an easy way to submit a form
  $scope.submit = function() {
    
  };
};

/*
 * Register it with angular
 */
app.controller(IndexController.name, [
  '$scope',
  '$location',
  IndexController
]);

/*
 * Let others know where to find it
 */
module.exports = IndexController.name;
