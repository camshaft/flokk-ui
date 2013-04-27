/*
 * Module dependencies
 */
var app = require("..");

/*
 * CartController
 */
function CartController($scope, $rootScope) {
  // TODO set the page title once we have an actual response from the server
  // $rootScope.title = $scope.category;
};

/*
 * Register it with angular
 */
app.controller(CartController.name, [
  '$scope',
  '$rootScope',
  CartController
]);

/*
 * Let others know where to find it
 */
module.exports = CartController.name;
