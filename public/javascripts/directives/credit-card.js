/**
 * Module dependencies
 */

var app = require('..');

/**
 * creditCard
 */

function creditCard() {
  return {
    require: 'ngModel',
    link: function($scope, elem, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (balanced.card.isCardNumberValid(viewValue)) {
          // it is valid
          ctrl.$setValidity('creditCard', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('creditCard', false);
          return undefined;
        }
      });
    }
  }
};

/**
 * Register it with angular
 */

app.directive('creditCard', [
  creditCard
]);

/**
 * Let others know where to find it
 */

module.exports = 'creditCard';
