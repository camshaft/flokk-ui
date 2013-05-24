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
    templateUrl: '/partials/remaining.nghtml',
    replace: false,
    scope: true,
    link: function($scope, elem, attrs) {
      $scope.$watch(attrs.ngModel, function(remaining) {
        // The sale is over
        if (!remaining || remaining < 0) return $scope.onSale = false;

        $scope.seconds = remaining % 60;
        $scope.minutes = Math.floor((remaining / 60) % 60);
        $scope.hours = Math.floor(remaining / 60 / 60);
        $scope.onSale = true;
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
