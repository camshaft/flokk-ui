/**
 * Module dependencies
 */

var stylus = module.exports = require('component-stylus-plugin');
var nib = require('nib')();

stylus.includeCSS = true;
stylus.plugins.push(nib);
