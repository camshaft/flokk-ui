/*
 * Module dependencies
 */
var app = require(".");

/**
 * Initialize the controllers
 */
var AccountController = require("./controllers/account")
  , IndexController = require("./controllers/index")
  , CartController = require("./controllers/cart")
  , CategoryController = require("./controllers/category")
  , ItemController = require("./controllers/item")
  , NavController = require("./controllers/nav")
  , SidenavController = require("./controllers/sidenav");

/**
 * Initialize the directives used outside of the controllers
 */
var moment = require("./directives/moment")
  , i18n = require("./directives/i18n");

/*
 * Configure the app
 */
app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/partials/index.nghtml",
        controller: IndexController
      })
      .when("/account", {
        templateUrl: "/partials/account.nghtml",
        controller: AccountController
      })
      .when("/cart", {
        templateUrl: "/partials/cart.nghtml",
        controller: CartController
      })
      .when("/categories/:category", {
        templateUrl: "/partials/category.nghtml",
        controller: CategoryController
      })
      .when("/categories/:category/:subcategory", {
        templateUrl: "/partials/category.nghtml",
        controller: CategoryController
      })
      .when("/items/:item", {
        templateUrl: "/partials/item.nghtml",
        controller: ItemController
      })
      .otherwise({
        templateUrl: "/partials/404.nghtml",
        controller: IndexController
      });

    $locationProvider.html5Mode(true);
  }
]);