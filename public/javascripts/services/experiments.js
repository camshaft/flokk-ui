/*
 * Module dependencies
 */
var app = require("..")
  // , Pivot = require("pivot");

/*
 * API Interaction layer
 */
function pivot() {
  var experiments = Pivot();

  // TODO setup experiments

  // TODO apply variants for the user

  return {
    features: {
      'time-remaining': false
    },
    feature: experiments.feature.bind(experiments)
  };
};

/*
 * Register it with angular
 */
app.factory(pivot.name, [
  pivot
]);

/*
 * Let others know where to find it
 */
module.exports = pivot.name;
