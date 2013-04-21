/*
 * Module dependencies
 */
var app = require("..")
  , ago = require("moment")
  , pad = require("pad")
  , pivot = require("../services/pivot");

/*
 * moment
 */
function moment(experiments) {
  return function($scope, elem, attrs) {
    var end = $scope.$eval(attrs.moment);

    if(experiments.features['time-remaining'] === "text") {
      exp_updateDisplayText(end, elem);
    }
    else {
      updateDisplay(end, elem);
    }
  };
};

function updateDisplay (end, elem) {
  var now = Math.floor(Date.now()/1000)
    , diff = end - now
    , s = diff % 60
    , m = Math.floor((diff / 60) % 60)
    , h = Math.floor((diff / 60 / 60) % 24)
    , d = Math.floor((diff / 60 / 60 / 24));

  // If it's over say so
  if(diff < 0) return;

  var time = [
    pad(""+h,2,"0"),
    pad(""+m,2,"0"),
    pad(""+s,2,"0")
  ]

  // Set the text
  elem.text(time.join(":"));

  setTimeout(function() {
    updateDisplay(end, elem);
  }, 1000);
}

function exp_updateDisplayText (end, elem) {
  var diff = ago.unix(end).fromNow();
  elem.text(diff);

  setTimeout(function() {
    exp_updateDisplayText(end, elem);
  }, 1000); // Be smart about how long the timeout is
}

/*
 * Register it with angular
 */
app.directive(moment.name, [
  pivot,
  moment
]);

/*
 * Let others know where to find it
 */
module.exports = moment.name;
