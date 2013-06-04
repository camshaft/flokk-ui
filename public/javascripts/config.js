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
  , HFController = require("./controllers/hf")
  , SalesController = require("./controllers/sales")
  , SidenavController = require("./controllers/sidenav")
  , BrandsController = require("./controllers/brands")
  , BrandController = require("./controllers/brand");

/**
 * Load the partials
 */
var notFound = require("../partials/404.js")
  , about = require("../partials/about.js")
  , account = require("../partials/account.js")
  , brand = require("../partials/brand.js")
  , brands = require("../partials/brands.js")
  , category = require("../partials/category.js")
  , contact = require("../partials/contact.js")
  , copyright = require("../partials/copyright.js")
  , item = require("../partials/item.js")
  , sales = require("../partials/sales.js")
  , sidenav = require("../partials/sidenav.js");

/**
 * Initialize the directives used outside of the controllers
 */
var i18nBind = require("./directives/i18n-bind")
  , lazyLoad = require("./directives/lazy-load");

/**
 * Initialize the filters used outside of the controllers
 */
var i18n = require("./filters/i18n")
  , param = require("./filters/param")
  , slugify = require("./filters/slugify");

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
      .when("/categories/:slug/:category", {
        templateUrl: category,
        controller: CategoryController
      })
      .when("/brands", {
        templateUrl: brands,
        controller: BrandsController
      })
      .when("/brands/:slug/:brand", {
        templateUrl: brand,
        controller: BrandController
      })
      .when("/items/:slug/:item", {
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
