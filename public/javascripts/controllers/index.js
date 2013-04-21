/*
 * Module dependencies
 */
var app = require("..");

/*
 * IndexController
 */
function IndexController($scope, $location) {
  $scope.$watch(function() {
    return $location.path()
  }, function(val) {
    $scope.path = val;
  })
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
