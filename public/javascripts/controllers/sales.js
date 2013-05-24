/*
 * Module dependencies
 */
var app = require("..")
  , accessToken = require("../lib/access-token")
  , loading = require("../lib/loading")
  , subscribe = require("../lib/subscribe")
  , superagent = require("superagent")
  , Batch = require("batch");

/*
 * SalesController
 */
function SalesController($scope) {
  function onError(err) {
    console.error(err);
  };

  superagent
    .get("/api")
    .set(accessToken.auth())
    .on("error", onError)
    .end(function(res) {
      // We can't see the sales
      if(!res.body.sales) return onError(new Error("Couldn't find sales"));

      superagent
        .get(res.body.sales.href)
        .set(accessToken.auth())
        .on("error", onError)
        .end(function(res) {
          $scope.$apply(function() {
            $scope.itemRes = res.body;
          });

          if(!res.body.items) return onError(new Error("No items on sales"));

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
app.controller(SalesController.name, [
  '$scope',
  SalesController
]);

/*
 * Let others know where to find it
 */
module.exports = SalesController.name;
