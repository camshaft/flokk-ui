/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("superagent");

/*
 * API Interaction layer
 */
function api() {
  return function(path) {
    superagent.get(path || "/api");
  };
};

/*
 * Register it with angular
 */
app.factory(api.name, [
  api
]);

/*
 * Let others know where to find it
 */
module.exports = api.name;
