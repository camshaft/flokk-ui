/*
 * Module dependencies
 */
var app = require("..")
  , Preloader = require('preloader');

/*
 * lazyLoad
 */
function lazyLoad() {
  return {
    link: function($scope, elem, attrs) {
      $scope.$watch(attrs.lazyLoad, function(img) {
        if(!img) return;

        var loader = new Preloader;

        loader.add(img);

        loader.end(function() {
          elem.attr("src", img);
        });
      });
    }
  }
};

/*
 * Register it with angular
 */
app.directive("lazyLoad", [
  lazyLoad
]);

/*
 * Let others know where to find it
 */
module.exports = "lazyLoad";
