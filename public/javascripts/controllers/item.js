/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , accessToken = require("../lib/access-token")
  , subscribe = require("../lib/subscribe")
  , timer = require("../lib/timer")
  , superagent = require("superagent");

/**
 * Directives
 */
require("../directives/remaining");

/*
 * ItemController
 */
function ItemController($scope, $routeParams, $location) {
  // Be able to load this within a route or in a list
  if($routeParams.item) return fetch(param.decode($routeParams.item), $scope);

  $scope.$watch('itemLink', function(link) {
    if(link) fetch(link.href, $scope);
  });
};

function fetch (href, $scope) {
  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err);
  };

  superagent
    .get(href)
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      // We can't see this item
      if(!res.body) return;

      var item = res.body;

      // Display it to the view
      $scope.$apply(function() {
        $scope.item = item;
      });

      // We can't see any sales for the item
      if(!item.sale) return;

      // Fetch the sale info
      superagent
        .get(item.sale.href)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          // The sale isn't available
          if(!res.body) return;

          var sale = res.body;

          // Display the sale info
          $scope.$apply(function() {
            $scope.sale = sale;
          });

          // The item isn't on sale
          if(!sale.ending) return;

          // Update the remaining time
          function updateRemaining (time) {
            $scope.$apply(function() {
              var remaining = sale.remaining = sale.ending - time;
              sale.onSale = remaining > 0;
            });
          };

          // Listen to the global timer
          timer.on("update", updateRemaining);

          // subscribe to price changes
          var subscription = subscribe(sale.href, function(newInfo) {
            $scope.$apply(function() {
              sale.price = newInfo.price;
              sale.ending = newInfo.ending;
            });
          });

          // Unsubscribe we're done here
          $scope.$on('$destroy', function() {
            timer.off("update", updateRemaining);
            subscribe.clear(subscription);
          });
        });
    });
}

/*
 * Register it with angular
 */
app.controller(ItemController.name, [
  '$scope',
  '$routeParams',
  '$location',
  ItemController
]);

/*
 * Let others know where to find it
 */
module.exports = ItemController.name;
