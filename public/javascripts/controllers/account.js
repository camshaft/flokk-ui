/**
 * Module dependencies
 */
var app = require("..")
  , analytics = require("../lib/analytics")
  , client = require("../lib/client");

/**
 * AccountController
 */
function AccountController($scope) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  client()
    .on("error", onError)
    .end(function(res) {
      if(!res.body.account) return onError(new Error("No account found"));

      res
        .follow('account')
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.account = res.body;
          });
        });
    });
};

/**
 * Register it with angular
 */
app.controller("AccountController", [
  '$scope',
  AccountController
]);

/**
 * Let others know where to find it
 */
module.exports = "AccountController";
