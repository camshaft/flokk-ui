/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , accessToken = require("../lib/access-token")
  , superagent = require("superagent");

/*
 * ItemController
 */
function ItemController($scope, $routeParams, $location) {
  var itemUrl = param.decode($routeParams.item);

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err);
  };

  superagent
    .get(itemUrl)
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      var item = res.body;

      // Display it to the view
      $scope.$apply(function() {
        $scope.item = item;
      });

      // We can't see any sales for the item
      if(!item.sale) return;

      // Fetch the sale info
      superagent
        .get(item.sale)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          // The item isn't on sale
          if(!res.body.onSale) return;

          // Update the sale info
          function updatePrice(sale) {
            $scope.$apply(function() {
              item.sale = sale;
            });
          };

          // Initially display the sale info
          updatePrice(res.body);

          // subscribe to price changes
          subscribe(res.body.href, updatePrice);
        });
    });
};

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
