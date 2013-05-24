/*
 * Module dependencies
 */
var app = require("..")
  , pad = require("../filters/pad");

/*
 * remaining
 */
function remaining() {
  return {
    template: '<span class="hours" data-ng-bind="hours | pad:2:0"></span>:<span class="minutes" data-ng-bind="minutes | pad:2:0"></span>:<span class="seconds" data-ng-bind="seconds | pad:2:0"></span>',
    replace: false,
    scope: true,
    link: function($scope, elem, attrs) {
      $scope.$watch(attrs.ngModel, function(remaining) {
        $scope.seconds = remaining % 60;
        $scope.minutes = Math.floor((remaining / 60) % 60);
        $scope.hours = Math.floor(remaining / 60 / 60);
      });
    }
  }
};

/*
 * Register it with angular
 */
app.directive(remaining.name, [
  remaining
]);

/*
 * Let others know where to find it
 */
module.exports = remaining.name;
