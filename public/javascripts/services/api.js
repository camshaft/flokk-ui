/*
 * Module dependencies
 */
var app = require("..")
  , hal = require("hal");

/*
 * API Interaction layer
 */
function api() {
  return new hal("http://localhost:5001");
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
