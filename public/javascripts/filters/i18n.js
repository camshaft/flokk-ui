/**
 * Module dependencies
 */

var app = require('..');
var translations = require('../services/translations');

/**
 * i18n
 */

function i18n(polygot) {
  return function(input, key, options) {
    if (!input || !key) return '';
    if(!options) options = {};
    options._ = input;

    return polygot.t(key, options);
  };
}

/**
 * Register it with angular
 */

app.filter('i18n', [
  translations,
  i18n
]);

/**
 * Let others know where to find it
 */

module.exports = 'i18n';
