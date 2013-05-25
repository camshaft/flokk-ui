/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("superagent")
  , accessToken = require("../lib/access-token");

/*
 * AccountController
 */
function AccountController($scope) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
  };

  superagent
    .get("/api")
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      if(!res.body.profile) return onError(new Error("Not Logged In"));

      superagent
        .get(res.body.profile)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.profile = res.body;
          });
        });
    });
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
