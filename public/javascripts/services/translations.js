/**
 * Module dependencies
 */
var app = require("..")
  , Polyglot = require("polyglot");

/**
 * Translations service
 */
function translations() {
  // TODO send off workflow when key is not found
  return new Polyglot;
};

/**
 * Register it with angular
 */
app.factory(translations.name, [
  translations
]);

/**
 * Let others know where to find it
 */
module.exports = translations.name;
