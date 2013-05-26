/**
 * Module dependencies
 */
var accessToken = require("./access-token")()
  , metric = require("metric-log");

/**
 * Options
 */
var options = {};

/**
 * Track the session
 */
if (accessToken) options.session = accessToken.slice(0,32);

/**
 * Create a context
 */
var ctx = metric.context(options);

/**
 * Expose the context
 */
module.exports = ctx;