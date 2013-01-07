var flokk = angular.module("flokk", [
  "flokk.controllers",
  "flokk.directives",
  "flokk.filters",
  "flokk.services"
]);

flokk.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/",{
        templateUrl: "/partials/index.html"
      })
      .when("/cart",{
        templateUrl: "/partials/cart.html",
        controller: "CartController"
      })
      .when("/account",{
        templateUrl: "/partials/account.html",
        controller: "AccountController"
      })
      .when("/products/:category/:subcategory",{
        templateUrl: "/partials/products.html",
        controller: "ProductsController"
      })
      .otherwise({
        templateUrl: "/partials/404.html"
      });

    $locationProvider.html5Mode(true);
  }

]);
