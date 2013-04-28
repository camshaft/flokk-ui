/*
 * Module dependencies
 */
var app = require("..");

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
 * ItemController
 */
function ItemController($scope, $rootScope, $routeParams, $location) {
  // TODO set the page title once we have an actual response from the server
  // $rootScope.title = $scope.category;
  var itemId = $routeParams.item;
  $scope.image = $routeParams.image || 0;

  $scope.image = parseInt(($location.hash() || "").replace("image-", "") || "0");

  var item = $scope.item = {
    id: itemId,
    title: "Lame print",
    vendor: {name: "Scott n' Dave", rel: "scott-n-dave"},
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen- derit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: images[$scope.image],
    thumbnails: images.slice(0,5),
    remaining: Math.floor(Math.random()*360),
    purchases: Math.floor(Math.random()*5),
    quantity: Math.floor(Math.random()*20+5),
    price: 45.46,
    retail: 49.99,
    onSale: !!Math.floor(Math.random()*2),
    addToCart: {
      target: "/",
      fields: [
        {name: "color", prompt: "Color", value: "black", options: [
          {value: "black", prompt: "Black"},
          {value: "white", prompt: "White"},
          {value: "red", prompt: "Red"},
          {value: "green", prompt: "Green"}
        ]},
        {name: "size", prompt: "Size", value: "xlarge", options: [
          {value: "small", prompt: "Small"},
          {value: "medium", prompt: "Medium"},
          {value: "large", prompt: "Large"},
          {value: "xlarge", prompt: "X-Large"}
        ]}
      ]
    }
  };

  if(!item.onSale) return;
  var timer = setInterval(function() {
    $scope.$apply(function() {
      if(item.remaining === 0) return clearInterval(timer);
      item.remaining--;
    });
  }, 1000);
};

/*
 * Register it with angular
 */
app.controller(ItemController.name, [
  '$scope',
  '$rootScope',
  '$routeParams',
  '$location',
  ItemController
]);

/*
 * Let others know where to find it
 */
module.exports = ItemController.name;
