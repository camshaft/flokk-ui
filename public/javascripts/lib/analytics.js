/**
 * Module dependencies
 */

var envs = require('envs');

var analytics = module.exports = require('analytics');

analytics.initialize({
  'Mixpanel': {
    token: envs('MIXPANEL_KEY')
  },
  'Google Analytics': {
    token: envs('GOOGLE_KEY')
  }
});
