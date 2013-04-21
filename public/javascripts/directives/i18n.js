/*
 * Module dependencies
 */
var app = require("..");

/*
 * bind-i18n
 */
function bindI18n() {
  return function($scope, elem, attrs) {
    var options = $scope.$eval(attrs.bindI18n);
    elem.text(options._ ? options._ : options);
  };
};

/*
 * Register it with angular
 */
app.directive(bindI18n.name, [
  bindI18n
]);

/*
 * Let others know where to find it
 */
module.exports = bindI18n.name;
