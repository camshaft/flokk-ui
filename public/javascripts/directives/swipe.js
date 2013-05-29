/*
 * Module dependencies
 */
var app = require("..")
  , Swipe = require('swipe');

/*
 * swipe
 */
function swipe() {
  return {
    link: function($scope, elem, attrs) {
      var list;
      $scope.$watch(attrs.swipe, function(val) {
        // We don't have any elements
        if(!val || !val.length) return;

        // If we've already attached swipe just refresh it
        if(list) list.refresh();

        list = new Swipe(elem[0]);
      });
    }
  }
};

/*
 * Register it with angular
 */
app.directive("swipe", [
  swipe
]);

/*
 * Let others know where to find it
 */
module.exports = "swipe";
