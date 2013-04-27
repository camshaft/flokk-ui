/*
 * Module dependencies
 */
var app = require("..");

/*
 * AccountController
 */
function AccountController($scope, $rootScope) {
  $scope.account = {
    name: "Cameron Bytheway",
    avatar: "http://www.gravatar.com/avatar/dafd213c94afdd64f9dc4fa92f9710ea?s=64"
  };

  // TODO set the page title once we have an actual response from the server
  // $rootScope.title = $scope.category;
};

/*
 * Register it with angular
 */
app.controller(AccountController.name, [
  '$scope',
  '$rootScope',
  AccountController
]);

/*
 * Let others know where to find it
 */
module.exports = AccountController.name;
