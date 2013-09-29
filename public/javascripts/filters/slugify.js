/**
 * Module dependencies
 */

var app = require('..');
var slug = require('slug');

/**
 * slugify
 */

function slugify() {
  return function(str, opts) {
    if(!str) return '';
    return slug(str, opts);
  };
}

/**
 * Register it with angular
 */

app.filter('slugify', [
  slugify
]);

/**
 * Let others know where to find it
 */

module.exports = 'slugify';
