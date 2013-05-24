/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , accessToken = require("../lib/access-token")
  , subscribe = require("../lib/subscribe")
  , superagent = require("superagent")
  , Batch = require("batch");

/**
 * Directives
 */
require("../directives/remaining");

/*
 * CategoryController
 */
function CategoryController($scope, $rootScope, $routeParams) {
  var categoryUrl = param.decode($routeParams.category);

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err);
  };

  // Get the category information
  superagent
    .get(categoryUrl)
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      $scope.$apply(function() {
        $scope.categoryRes = res.body;
      });

      // Get the category items listing
      superagent
        .get(res.body.items.href)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemsRes = res.body;
          });

          // Fetch the item info
          var batch = new Batch;
          res.body.items.forEach(function(item) {
            batch.push(function(done) {
              superagent
                .get(item.href)
                .set(accessToken.auth())
                .on("error", done)
                .end(function(res) {
                  done(null, res.body);
                });
            });
          });

          // Update the view as results come in
          batch.on("progress", function(progress) {
            // TODO Should we show progress of loading?
            var item = progress.value
              , idx = progress.index;

            // Display it to the view
            $scope.$apply(function() {
              $scope.itemsRes.items[idx] = item;
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

          // Execute the batch
          batch.end(function(err) {
            if(err) onError(err);
          });
        });
    });
};

/*
 * Register it with angular
 */
app.controller(CategoryController.name, [
  '$scope',
  '$rootScope',
  '$routeParams',
  CategoryController
]);

/*
 * Let others know where to find it
 */
module.exports = CategoryController.name;
