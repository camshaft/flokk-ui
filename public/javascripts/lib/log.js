/**
 * Module dependencies
 */

var accessToken = require('access-token')();
var envs = require('envs');
var metric = require('metric-log');
var log = require('log');

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

window.metric = module.exports = ctx;

/**
 * Only enable logging in prod
 */

var PIPELINE = envs('SYSLOG_PIPELINE');

if (PIPELINE) ctx.log = log(PIPELINE, {app: 'flokk-ui'});

/**
 * Setup an error logger
 */

module.exports.error = function() {
  // TODO log to the server
  console.error.apply(console, arguments);
};
