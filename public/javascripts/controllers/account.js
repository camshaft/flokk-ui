/*
 * Module dependencies
 */
var app = require("..");

/*
 * AccountController
 */
function AccountController($scope) {
  $scope.account = {
    name: "Cameron Bytheway",
    avatar: "http://www.gravatar.com/avatar/dafd213c94afdd64f9dc4fa92f9710ea?s=64"
  };
};

/*
 * Register it with angular
 */
app.controller(AccountController.name, [
  '$scope',
  AccountController
]);

/*
 * Let others know where to find it
 */
module.exports = AccountController.name;
