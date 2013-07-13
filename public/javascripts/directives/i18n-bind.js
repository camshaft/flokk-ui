/**
 * Module dependencies
 */

var app = require('..');

/**
 * i18n-bind
 *
 * Content-editable binding for editing translations
 */

function i18nBind() {
  return function($scope, elem, attrs) {
    // TODO Enable editing mode
    // TODO add translations to backend

    elem.addClass('i18n-binding').data('$binding', attrs.i18nBind);
    $scope.$watch(attrs.i18nBind, function i18nBindWatchAction(val) {
      elem.text(val == undefined ? '' : val);
    });
  };
};

/**
 * Register it with angular
 */

app.directive('i18nBind', [
  i18nBind
]);

/**
 * Let others know where to find it
 */

module.exports = 'i18nBind';
