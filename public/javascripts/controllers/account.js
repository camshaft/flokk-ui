/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("../lib/superagent");

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
    .on("error", onError)
    .end(function(res) {
      if(!res.body.account) return onError(new Error("Not Logged In"));

      superagent
        .get(res.body.account)
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.account = res.body;
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
