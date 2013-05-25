/*
 * Module dependencies
 */
var app = require("..")
  , accessToken = require("../lib/access-token")
  , loading = require("../lib/loading")
  , subscribe = require("../lib/subscribe")
  , superagent = require("superagent")
  , Batch = require("batch");

/*
 * SalesController
 */
function SalesController($scope) {
  function onError(err) {
    console.error(err.stack || err.message || err);
  };

  superagent
    .get("/api")
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      // We can't see the sales
      if(!res.body.sales) return onError(new Error("Couldn't find sales"));

      superagent
        .get(res.body.sales.href)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          // We can't get to the sales
          if(!res.body) return onError(new Error("No items on sale"));

          $scope.$apply(function() {
            $scope.itemRes = res.body;
          });
        });

    });
};

/*
 * Register it with angular
 */
app.controller(SalesController.name, [
  '$scope',
  SalesController
]);

/*
 * Let others know where to find it
 */
module.exports = SalesController.name;
