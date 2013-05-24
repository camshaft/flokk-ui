/*
 * Module dependencies
 */
var app = require("..")
  , param = require("../lib/url-param")
  , accessToken = require("../lib/access-token")
  , loading = require("../lib/loading")
  , subscribe = require("../lib/subscribe")
  , timer = require("../lib/timer")
  , superagent = require("superagent")
  , Batch = require("batch");

/**
 * Directives
 */
require("../directives/remaining");

/*
 * CategoryController
 */
function CategoryController($scope, $routeParams) {
  var categoryUrl = param.decode($routeParams.category);

  function onError(err) {
    // TODO show a graceful error to the user
    console.error(err);
  };

  loading.start();

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
            var item = progress.value
              , idx = progress.index;

            loading.update(progress.percent);

            // Display it to the view
            $scope.$apply(function() {
              $scope.itemsRes.items[idx] = item;
            });

            // We can't see any sales for the item
            if(!item.sale) return;

            // Fetch the sale info
            superagent
              .get(item.sale.href)
              .set(accessToken.auth())
              .on("error", onError)
              .end(function(res) {
                // The item isn't on sale
                if(!res.body.ending) return;

                // Update the sale info
                function updatePrice(sale) {
                  $scope.$apply(function() {
                    item.saleInfo = sale;
                  });
                };

                // Update the remaining time
                function updateRemaining (time) {
                  $scope.$apply(function() {
                    item.sale.remaining = item.sale.ending - time;
                  });
                };

                // Listen to the global timer
                timer.on("update", updateRemaining);

                // Unsubscribe from timer changes when we're done here
                $scope.$on('$destroy', function() {
                  timer.off("update", updateRemaining);
                });

                // Initially display the sale info
                updatePrice(res.body);

                // subscribe to price changes
                subscribe(res.body.href, updatePrice);
              });
          });

          // Execute the batch
          batch.end(function(err) {
            if(err) onError(err);
            loading.end();
          });
        });
    });
};

/*
 * Register it with angular
 */
app.controller(CategoryController.name, [
  '$scope',
  '$routeParams',
  CategoryController
]);

/*
 * Let others know where to find it
 */
module.exports = CategoryController.name;
