/*
 * Module dependencies
 */
var app = require("..")
  , moment = require("moment")
  , pad = require("pad")
  , experiments = require("../services/experiments");

/*
 * remaining
 */
function remaining(experiments) {
  return function($scope, elem, attrs) {
    $scope.$watch(attrs.ngModel, function(remaining) {
      if(experiments.features['time-remaining'] === "text") {
        exp_updateDisplayText(remaining, elem);
      }
      else {
        updateDisplay(remaining, elem);
      }
    });
  };
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
