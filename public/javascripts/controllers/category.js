/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , superagent = require("../lib/superagent");

/*
 * CategoryController
 */
function CategoryController($scope, $routeParams) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  // Get the category information
  superagent
    .get(param.decode($routeParams.category))
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.categoryRes = res.body;
      });

      // Get the category items listing
      superagent
        .get(res.body.items.href)
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
