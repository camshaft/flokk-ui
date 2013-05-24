/*
 * Module dependencies
 */
var app = require("..")
  , accessToken = require("../lib/access-token")
  , superagent = require("superagent");

/*
 * SidenavController
 */
function SidenavController($scope, $routeParams) {
  $scope.$watch(function() {
    return $routeParams.category;
  }, function(val) {
    $scope.current = val;
  });

  function onError(err) {
    console.error(err);
  };

  superagent
    .get("/api")
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {

      superagent
        .get(res.body.categories.href)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.body = res.body;
          });
        });

    });
};

/*
 * Register it with angular
 */
app.controller(SidenavController.name, [
  '$scope',
  '$routeParams',
  SidenavController
]);

/*
 * Let others know where to find it
 */
module.exports = SidenavController.name;
