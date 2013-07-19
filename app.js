/**
 * Module dependencies
 */

var stack = require("flokk-angular")
  , envs = require('envs');

/**
 * Expose the app
 */

var app = module.exports = stack();

/**
 * Configure the app
 */

app.locals({
  ngapp: envs('APP_NAME', 'flokk'),
  site: envs('SITE_URL', 'https://www.theflokk.com'),
  title: envs('INDEX_TITLE', 'Home'),
  description: envs('SITE_DESCRIPTION', ''),
  env: {
    BROWSER_ENV: envs('NODE_ENV', 'production'),
    API_URL: envs('API_URL', '/api'),
    PUSHER_KEY: envs('PUSHER_KEY'),
    BALANCED_KEY: envs('BALANCED_KEY')
  }
});

// TODO pull these from the cdn

app.locals({
  styles: [
    '/public/build.css'
  ]
});

app.locals({
  scripts: [
    '/public/build.js'
  ]
});
