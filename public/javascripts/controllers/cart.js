/*
 * Module dependencies
 */
var app = require("..");

/*
 * CartController
 */
function CartController($scope) {
  
};

/*
 * Register it with angular
 */
app.controller(CartController.name, [
  '$scope',
  CartController
]);

/*
 * Let others know where to find it
 */
module.exports = CartController.name;
