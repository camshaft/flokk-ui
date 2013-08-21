/**
 * Module dependencies
 */

var stack = require('flokk-angular')
var envs = require('envs');
var assets = require('simple-assets');

/**
 * Expose the app
 */

var app = module.exports = stack();

/**
 * Configure the app
 */

app.locals({
  ngapp: envs('APP_NAME', 'flokk'),
  title: envs('INDEX_TITLE', 'Home'),
  description: envs('SITE_DESCRIPTION', ''),
  fluid: true,
  env: {
    BROWSER_ENV: envs('NODE_ENV', 'production'),
    API_URL: envs('API_URL'),
    PUSHER_KEY: envs('PUSHER_KEY')
  }
});

/**
 * Dynamically set the locals based on the `x-env` header
 */

app.useBefore('router', function envLocals(req, res, next) {
  var locals = req.get('x-env') === 'production'
    ? { balanced: envs('BALANCED_KEY_PROD') }
    : { balanced: envs('BALANCED_KEY_TEST') };

  res.locals(locals);
  next();
});

/**
 * Put a cdn in front
 */

var CDN_URL = envs('CDN_URL', '');

function lookup(file) {
  return [CDN_URL, assets(file)].join('/');
};

app.locals({
  styles: [
    lookup('build/build.min.css')
  ]
});

app.locals({
  scripts: [
    lookup('build/build.min.js')
  ]
});
