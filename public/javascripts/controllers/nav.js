/*
 * Module dependencies
 */
var app = require("..");

/*
 * NavController
 */
function NavController($scope) {
  
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
