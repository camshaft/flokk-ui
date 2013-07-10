/**
 * Module dependencies
 */
var app = require("..")
  , client = require('../lib/client')
  , each = require('each')
  , type = require('type');

/**
 * Load the partials
 */
require("../../partials/footer");

/**
 * IndexController
 */
function IndexController($scope, $location) {
  $scope.$watch(function() {
    return $location.path()
  }, function(val) {
    $scope.path = val;
  });

  // TODO expose an easy way to submit a form
  $scope.submit = function(form, values, cb) {
    if (type(values) === 'function') {
      cb = values;
      values = {};
    }

    var method = (form.method || 'post').toLowerCase();

    each(form.input, function(key, conf) {
      if (conf.name) key = conf.name;
      if (!values[key]) values[key] = conf.value;
    });

    (client[method])(form.action)
      .send(values)
      .end(function(err, res){
        cb(err, res);
      })
  };
};

/**
 * Register it with angular
 */
app.controller("IndexController", [
  '$scope',
  '$location',
  IndexController
]);

/**
 * Let others know where to find it
 */
module.exports = "IndexController";
