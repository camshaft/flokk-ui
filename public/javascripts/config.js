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
 * Load the partials
 */
var notFound = require("../partials/404.js")
  , about = require("../partials/about.js")
  , account = require("../partials/account.js")
  , category = require("../partials/category.js")
  , contact = require("../partials/contact.js")
  , copyright = require("../partials/copyright.js")
  , item = require("../partials/item.js")
  , sales = require("../partials/sales.js")
  , sidenav = require("../partials/sidenav.js")
  , vendor = require("../partials/vendor.js")
  , vendors = require("../partials/vendors.js")

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
        templateUrl: sales,
        controller: SalesController
      })
      .when("/account", {
        templateUrl: account,
        controller: AccountController
      })
      .when("/categories/:category", {
        templateUrl: category,
        controller: CategoryController
      })
      .when("/vendors", {
        templateUrl: vendors,
        controller: VendorsController
      })
      .when("/vendors/:vendor", {
        templateUrl: vendor,
        controller: VendorController
      })
      .when("/items/:item", {
        templateUrl: item,
        controller: ItemController
      })
      .when("/contact", {
        templateUrl: contact,
      })
      .when("/about", {
        templateUrl: about,
      })
      .when("/copyright", {
        templateUrl: copyright,
      })
      .otherwise({
        templateUrl: notFound,
        controller: IndexController
      });

    $locationProvider.html5Mode(true);
  }
]);
