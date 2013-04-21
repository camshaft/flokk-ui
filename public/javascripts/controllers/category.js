/*
 * Module dependencies
 */
var app = require("..")
  , angular = require("angular");

var images = [
  "http://i47.tinypic.com/mack5g.jpg",
  "http://i47.tinypic.com/259bsqd.jpg",
  "http://i46.tinypic.com/17s8pw.jpg",
  "http://i45.tinypic.com/2dlmzyw.jpg",
  "http://oi49.tinypic.com/20h0d8z.jpg",
  "http://i47.tinypic.com/34fzp5u.jpg",
  "http://i48.tinypic.com/30szvbl.jpg",
  "http://i50.tinypic.com/344pkbl.jpg",
  "http://i47.tinypic.com/23u6dxy.jpg",
  "http://i45.tinypic.com/3520mky.jpg",
  "http://i46.tinypic.com/2hg7gbk.jpg",
  "http://i49.tinypic.com/2lx5xu.jpg"
];

/*
 * CategoryController
 */
function CategoryController($scope, $routeParams) {
  $scope.category = $routeParams.category;
  $scope.subcategory = $routeParams.subcategory;

  var _item = {title: "Thingy", price: 49.99};

  $scope.items = [];
  for (var i = 0; i < ($scope.subcategory ? 4 : 12); i++) {
    var item = angular.copy(_item);
    item.id = "item_"+i;
    item.thumbnail = images[Math.floor(Math.random() * images.length)];
    item.remaining = Math.floor(Date.now()/1000+Math.random()*36000);
    
    $scope.items.push(item);
  };
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
