/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , accessToken = require("../lib/access-token")
  , superagent = require("superagent");

/*
 * CategoryController
 */
function CategoryController($scope, $routeParams) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err);
  };

  // Get the category information
  superagent
    .get(param.decode($routeParams.category))
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.categoryRes = res.body;
      });

      // Get the category items listing
      superagent
        .get(res.body.items.href)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemsRes = res.body;
          });
        });
    });
};

/*
 * Register it with angular
 */
app.controller(CategoryController.name, [
  '$scope',
  '$routeParams',
  CategoryController
]);

/*
 * Let others know where to find it
 */
module.exports = CategoryController.name;
