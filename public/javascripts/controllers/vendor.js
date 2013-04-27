/*
 * Module dependencies
 */
var app = require("..");

/*
 * VendorController
 */
function VendorController($scope, $rootScope) {
  // TODO set the page title once we have an actual response from the server
  // $rootScope.title = $scope.category;
};

/*
 * Register it with angular
 */
app.controller(VendorController.name, [
  '$scope',
  '$rootScope',
  VendorController
]);

/*
 * Let others know where to find it
 */
module.exports = VendorController.name;
