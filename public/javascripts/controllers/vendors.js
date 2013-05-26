/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("../lib/superagent");

/*
 * VendorsController
 */
function VendorsController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  superagent
    .get("/api")
    .on("error", onError)
    .end(function(res) {
      // We can't see the vendors
      if(!res.body.vendors) return onError(new Error("Couldn't find vendors"));

      superagent
        .get(res.body.vendors.href)
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
  VendorsController
]);

/*
 * Let others know where to find it
 */
module.exports = VendorsController.name;
