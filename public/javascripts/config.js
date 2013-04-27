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
  , SidenavController = require("./controllers/sidenav")
  , VendorsController = require("./controllers/vendors")
  , VendorController = require("./controllers/vendor");

/**
 * Initialize the directives used outside of the controllers
 */
var i18nBind = require("./directives/i18n-bind");

/**
 * Initialize the directives used outside of the controllers
 */
var i18n = require("./filters/i18n");

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
      .when("/vendors", {
        templateUrl: "/partials/vendors.nghtml",
        controller: VendorsController
      })
      .when("/vendors/:vendor", {
        templateUrl: "/partials/vendor.nghtml",
        controller: VendorController
      })
      .when("/items/:item", {
        templateUrl: "/partials/item.nghtml",
        controller: ItemController
      })
      .when("/contact", {
        templateUrl: "/partials/contact.nghtml"
      })
      .when("/about", {
        templateUrl: "/partials/about.nghtml"
      })
      .when("/vendor-invite", {
        templateUrl: "/partials/vendor-invite.nghtml"
      })
      .when("/copyright", {
        templateUrl: "/partials/copyright.nghtml"
      })
      .otherwise({
        templateUrl: "/partials/404.nghtml",
        controller: IndexController
      });

    $locationProvider.html5Mode(true);
  }
]);