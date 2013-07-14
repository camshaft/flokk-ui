/**
 * Module dependencies
 */

var app = require('..')
  , client = require('hyperagent')
  , subscribe = require('../lib/subscribe')
  , each = require('each')
  , type = require('type');

/**
 * Load the partials
 */

require('../../partials/footer');

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

    if (!values) values = {};

    var method = (form.method || 'post').toLowerCase();

    each(form.input, function(key, conf) {
      if (conf.name) key = conf.name;
      if (!values[key]) values[key] = conf.value;
    });

    (client[method])(form.action)
      .send(values)
      .on('error', cb)
      .end(function(res){
        if (res.ok && res.body.href === form.action) subscribe.publish(form.action);
        if (cb) cb(null, res);
      })
  };
};

/**
 * Register it with angular
 */

app.controller('IndexController', [
  '$scope',
  '$location',
  IndexController
]);

/**
 * Let others know where to find it
 */

module.exports = 'IndexController';
