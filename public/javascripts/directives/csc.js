/**
 * Module dependencies
 */

var app = require('..');

/**
 * csc
 */

function csc() {
  return {
    require: 'ngModel',
    link: function($scope, elem, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var cc = $scope.$eval(attrs.csc);
        if (balanced.card.isSecurityCodeValid(cc, viewValue)) {
          // it is valid
          ctrl.$setValidity('csc', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('csc', false);
          return undefined;
        }
      });
    }
  }
};

/**
 * Register it with angular
 */

app.directive('csc', [
  csc
]);

/**
 * Let others know where to find it
 */

module.exports = 'csc';
