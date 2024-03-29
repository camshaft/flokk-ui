/**
 * Module dependencies
 */

var app = require('..');
var Polyglot = require('polyglot');

/**
 * Translations service
 */

function translations() {
  // TODO pull the browser locale
  // TODO send off workflow when key is not found
  var polyglot = new Polyglot({locale: 'en'});

  polyglot.extend({
    num_purchases: '%{smart_count} person has purchased this item |||| %{smart_count} people have purchased this item',
    remaining_items: '%{smart_count} item remaining |||| %{smart_count} items remaining'
  });

  return polyglot;
}

/**
 * Register it with angular
 */

app.factory('translations', [
  translations
]);

/**
 * Let others know where to find it
 */

module.exports = 'translations';
