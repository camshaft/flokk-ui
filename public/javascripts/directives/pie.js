/*
 * Module dependencies
 */
var app = require("..")
  , Pie = require("pie");

var TOTAL = 360;

/*
 * pie
 */
function pie(experiments) {
  return {
    link: function postLink($scope, elem, attrs) {
      var canvas = document.createElement("canvas");

      elem.append(canvas);

      var options = $scope.$eval(attrs.pie)
        , ctx = canvas.getContext('2d');

      var pie = Pie(options.selector);

      pie.size(options.size);
      canvas.width = canvas.height = options.size;

      $scope.$watch(attrs.ngModel, function(val) {
        pie.update(val/TOTAL*100);
        pie.draw(ctx);
      });
    }
  };
};

/*
 * Register it with angular
 */
app.directive(pie.name, [
  pie
]);

/*
 * Let others know where to find it
 */
module.exports = pie.name;
