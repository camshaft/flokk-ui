/*
 * Module dependencies
 */
var app = require("..");

/*
 * ItemController
 */
function ItemController($scope, $routeParams) {
  $scope.item = $routeParams.item;
};

/*
 * Register it with angular
 */
app.controller(ItemController.name, [
  '$scope',
  '$routeParams',
  ItemController
]);

/*
 * Let others know where to find it
 */
module.exports = ItemController.name;
