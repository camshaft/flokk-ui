/*
 * Module dependencies
 */
var app = require("..")
  , moment = require("moment")
  , pad = require("../filters/pad")
  , experiments = require("../services/experiments");

/*
 * remaining
 */
function remaining(experiments) {
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

function updateDisplay (remaining, elem) {
  var s = remaining % 60
    , m = Math.floor((remaining / 60) % 60)
    , h = Math.floor((remaining / 60 / 60) % 24)
    , d = Math.floor((remaining / 60 / 60 / 24));

  // If it's over say so
  if(remaining < 0) return;

  var time = [
    pad(""+h,2,"0"),
    pad(""+m,2,"0"),
    pad(""+s,2,"0")
  ]

  // Set the text
  elem.text(time.join(":"));
}

function exp_updateDisplayText (end, elem) {
  var diff = moment(Date.now()+end*1000).fromNow();
  elem.text(diff);
}

/*
 * Register it with angular
 */
app.directive(remaining.name, [
  experiments,
  remaining
]);

/*
 * Let others know where to find it
 */
module.exports = remaining.name;
