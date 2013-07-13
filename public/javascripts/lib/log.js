/**
 * Module dependencies
 */

var accessToken = require('access-token')()
  , envs = require('envs')
  , metric = require('metric-log');

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
 *
 * @todo hook this up to the syslog pipeline
 */

if (envs('BROWSER_ENV') === 'production') ctx.log = noop;

/**
 * Setup an error logger
 */

module.exports.error = function() {
  // TODO log to the server
  console.error.apply(console, arguments);
};

/**
 * noop
 */

function noop() {};
