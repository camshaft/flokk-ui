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
  balanced: envs('BALANCED_KEY_PROD'),
  env: {
    BROWSER_ENV: envs('NODE_ENV', 'test'),
    API_URL: envs('API_URL'),
    PUSHER_KEY: envs('PUSHER_KEY'),
    MIXPANEL_KEY: envs('MIXPANEL_KEY'),
    GOOGLE_KEY: envs('GOOGLE_KEY'),
    SYSLOG_PIPELINE: envs('SYSLOG_PIPELINE')
  }
});

/**
 * Dynamically set the locals based on the `x-env` header
 */

app.useBefore('router', function envLocals(req, res, next) {
  if (req.get('x-env') !== 'production') {
    res.locals.balanced = envs('BALANCED_KEY_TEST');
    res.locals.styles = styles();
    res.locals.scripts = scripts();
  }
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
  styles: styles(true)
});

app.locals({
  scripts: scripts(true)
});

function styles(min) {
  return [
    min ? lookup('build/build.min.css') : lookup('build/build.css')
  ];
};

function scripts(min) {
  return [
    min ? lookup('build/build.min.js') : lookup('build/build.js'),
    '//d3dy5gmtp8yhk7.cloudfront.net/2.1.1/sockjs.min.js',
    '//d3dy5gmtp8yhk7.cloudfront.net/2.1/pusher.min.js',
    '//assets.pinterest.com/js/pinit.js'
  ];
}
