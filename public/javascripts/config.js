/*
 * Module dependencies
 */
var app = require(".");

/**
 * Initialize the controllers
 */
var AccountController = require("./controllers/account")
  , IndexController = require("./controllers/index")
  , CategoryController = require("./controllers/category")
  , ItemController = require("./controllers/item")
  , NavController = require("./controllers/nav")
  , SalesController = require("./controllers/sales")
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
var i18n = require("./filters/i18n")
  , param = require("./filters/param");

/**
 * Initialize the loading icon
 */
require("./lib/loading");

/*
 * Configure the app
 */
app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/partials/sales.nghtml",
        controller: SalesController
      })
      .when("/account", {
        templateUrl: "/partials/account.nghtml",
        controller: AccountController
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
      .when("/login", {
        templateUrl: "/partials/login.nghtml"
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