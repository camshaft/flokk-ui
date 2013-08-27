/**
 * Module dependencies
 */

var app = require('..')
  , analytics = require('../lib/analytics')
  , start = require('in-progress')
  , subscribe = require('../lib/subscribe')
  , websafe = require('websafe-base64')
  , clock = require('clock')
  , each = require('each')
  , client = require('hyperagent')
  , dialog = require('dialog');

/**
 * Directives
 */

require('../directives/remaining');

/**
 * Load the partials
 */

require('../../partials/item-thumb');

/**
 * Start the clock
 */

clock.start();

/**
 * ItemController
 */

function ItemController($scope, $routeParams, $location) {
  $scope.signup = function() {
    dialog('Hey There!', 'We are still getting ready')
      .effect('slide')
      .overlay()
      .show();
  };

  // Be able to load this within a route or in a list
  if(!$routeParams.item) return $scope.$watch('itemLink', function(link) {
    if(link) fetch(link.href, $scope);
  });

  // Initialize the purchase form on the page
  $scope.purchaseForm = {};

  var swap = switchImage($scope, $location);

  swap();

  // Fetch the item
  fetch(websafe.decode($routeParams.item), $scope, swap);
};

function switchImage($scope, $location) {
  function exec(image) {
    var image = $scope.image = parseInt(image || '0');
    var length = $scope.item
      ? $scope.item.image.length
      : 0;

    $scope.nextImage = image === length - 1 ? 0 : image + 1;
    $scope.prevImage = image === 0 ? length - 1 : image - 1;
  };

  $scope.$watch(function() {
    return $location.hash();
  }, exec);

  return function() {
    exec($location.hash());
  };
};

function fetch (href, $scope, swap) {
  var done = start();

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err.stack || err.message || err);
    done();
  };

  client
    .get(href)
    .on('error', onError)
    .end(function(res) {
      var item = res.body;

      // We can't see this item
      if(!item) return done();

      // Display it to the view
      $scope.$apply(function() {
        $scope.item = item;
        if (swap) swap();
      });

      // We can't see any sales for the item
      if(!item.offers) return done();

      // Fetch the sale info
      res
        .follow('offers')
        .on('error', onError)
        .end(function(res) {
          // The sale isn't available
          if (!res.body) return done();

          var sale = res.body;

          // Display the sale info
          $scope.sale = sale;

          $scope.purchaseForm = {};
          if (sale.purchase) each(sale.purchase.input, function(key, conf) {
            if (conf.value) $scope.purchaseForm[key] = conf.value;
          });

          // The item isn't on sale
          done();
          if(!sale.ending) return $scope.$digest();

          // Update the remaining time
          function updateRemaining (time) {
            $scope.$apply(function() {
              // TODO find out if there is clock skew between the client and server.
              //      people might get angry if theirs says it has 5 minutes left
              //      when in reality the sale has ended. We may end up having to be
              //      generous on the time restrictions...

              var remaining = sale.remaining = sale.ending - time;
              sale.onSale = remaining > 0;
            });
          };

          // Listen to the global clock
          clock.on(updateRemaining);

          // subscribe to price changes
          var subscription = subscribe(sale.href, function(newInfo) {
            $scope.$apply(function() {
              sale.price = newInfo.price;
              sale.ending = newInfo.ending;
            });
          });

          // Unsubscribe we're done here
          $scope.$on('$destroy', function() {
            clock.off(updateRemaining);
            subscribe.clear(subscription);
          });
        });

      res
        .follow('watchers')
        .on('error', onError)
        .end(function(res) {
          // We can't see watcher info
          if (!res.body) return done();

          $scope.$apply(function() {
            $scope.watchers = res.body;
          });

          // subscribe to price changes
          var subscription = subscribe(res.body.href, function(watchers) {
            $scope.$apply(function() {
              $scope.watchers = watchers;
            });
          });

          // Unsubscribe we're done here
          $scope.$on('$destroy', function() {
            subscribe.clear(subscription);
          });
        });
    });
}

/**
 * Register it with angular
 */

app.controller('ItemController', [
  '$scope',
  '$routeParams',
  '$location',
  ItemController
]);

/**
 * Let others know where to find it
 */

module.exports = 'ItemController';
