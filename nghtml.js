/**
 * Module dependencies
 */
var nghtml = require("nghtml");

module.exports = nghtml({
  webroot: "public",
  module: "flokk",
  dev: true
});
