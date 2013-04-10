var c = angular.module("flokk.controllers", []);

c.controller("SidenavController", [
  "$rootScope",
  "$scope",
  "$routeParams",
  "$http",
  "categories",
  "request",

  function SidenavController($rootScope, $scope, $routeParams, $http, categories, request) {
    $scope.$routeParams = $routeParams;
    $scope.$watch("$routeParams", function() {
      var rel = $routeParams.category;
      if (!$scope.categories) return;
      angular.forEach($scope.categories._embedded.categories, function(cat) {
        cat.show = cat.rel == rel;
      });
    }, true);

    categories(function(err, cats) {
      $scope.categories = cats;
      cats._embedded.categories.forEach(function(category) {
        category._embedded = category._embedded || {};
        request(category, function(err, subs) {
          if (subs && subs._embedded && subs._embedded.subcategories) {
            category._embedded.subcategories = subs._embedded.subcategories;
          };
        });
      })
    });
  }
]);

c.controller("ProductsController", [
  "$scope",

  function ProductsController($scope) {
    $scope.items = [
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/4963/352/751/1/4963352751_1_1_4.jpg?timestamp=1348215127342"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      }
    ]
  }
]);

c.controller("CartController", [
  "$scope",
  "cart",
  "request",

  function CartController($scope, cart, request) {
    cart(function(err, cart) {
      $scope.cart = cart;
      $scope.items = [];
      cart._embedded.items.forEach(function(itemLink, idx) {
        request(itemLink, function(err, item) {
          $scope.items[idx] = item;
        })
      });
    });
  }
]);

c.controller("AccountController", [
  "$scope",

  function AccountController($scope) {

  }
]);

c.controller("CategoryController", [
  "$scope",

  function CategoryController($scope) {

  }
]);

c.controller("RootController", [
  "$scope",
  "$location",

  function RootController($scope, $location) {
    $scope.$watch('$location.path()', function(path) {

      switch($location.path()) {
        case "/cart":
          $scope.nav = "cart";
          break;
        case "/account":
          $scope.nav = "account";
          break;
        default:
          $scope.nav = "";
          break;
      }
    });
  }
]);

