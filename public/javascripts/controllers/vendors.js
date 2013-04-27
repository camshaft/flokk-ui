/*
 * Module dependencies
 */
var app = require("..");

/*
 * VendorsController
 */
function VendorsController($scope, $rootScope) {
  // TODO set the page title once we have an actual response from the server
  // $rootScope.title = $scope.category;
};

/*
 * Register it with angular
 */
app.controller(VendorsController.name, [
  '$scope',
  '$rootScope',
  VendorsController
]);

/*
 * Let others know where to find it
 */
module.exports = VendorsController.name;
