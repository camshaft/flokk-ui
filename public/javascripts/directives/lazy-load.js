/**
 * Module dependencies
 */

var app = require('..')
  , Preloader = require('preloader');

/**
 * lazyLoad
 */

function lazyLoad() {
  return {
    link: function($scope, elem, attrs) {
      // Add a lazy-load class
      elem.addClass('lazy-load');

      $scope.$watch(attrs.lazyLoad, function(img) {
        if(!img) return;
        elem.addClass('loading');

        var loader = new Preloader;

        loader.add(img);

        loader.end(function() {
          elem.removeClass('loading');
          elem.css('background-image', 'url('+img+')');
        });
      });
    }
  }
};

/**
 * Register it with angular
 */

app.directive('lazyLoad', [
  lazyLoad
]);

/**
 * Let others know where to find it
 */

module.exports = 'lazyLoad';
