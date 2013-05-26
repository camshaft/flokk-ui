/*
 * Module dependencies
 */
var app = require("..")
  , pad = require("../filters/pad");

/**
 * Load the partials
 */
var template = require("../../partials/remaining.js");

/*
 * remaining
 */
function remaining() {
  return {
    templateUrl: template,
    replace: false,
    scope: true,
    link: function($scope, elem, attrs) {
      $scope.$watch(attrs.ngModel, function(remaining) {
        // The sale is over
        if (!remaining || remaining < 0) return;

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
app.directive("remaining", [
  remaining
]);

/*
 * Let others know where to find it
 */
module.exports = "remaining";
