/*
 * Module dependencies
 */
var app = require("..")
  , accessToken = require("../lib/access-token")
  , superagent = require("superagent");

/*
 * VendorsController
 */
function VendorsController($scope, $rootScope) {
  function onError(err) {
    console.error(err);
  };

  superagent
    .get("/api")
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      // We can't see the vendors
      if(!res.body.vendors) return onError(new Error("Couldn't find vendors"));

      superagent
        .get(res.body.vendors.href)
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
app.controller(VendorsController.name, [
  '$scope',
  '$rootScope',
  VendorsController
]);

/*
 * Let others know where to find it
 */
module.exports = VendorsController.name;
