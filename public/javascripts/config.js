/**
 * Module dependencies
 */

var app = require('.')
  , envs = require('envs')
  , token = require('access-token');

/**
 * Load the environment
 */

if (window.env) envs.set(window.env);

/**
 * Initialize the logger
 */

var log = require('./lib/log');

/**
 * Initialize the analytics
 */

var analytics = require('./lib/analytics');
analytics.track('page load');

/**
 * Initialize the client
 */

var client = require('hyperagent');

/**
 * Pass the access token on all of the requests
 */

client.set(token.auth());

/**
 * Profile the requests
 */

client.profile = log.profile.bind(log);

/**
 * Initialize the controllers
 */

var AccountController = require('./controllers/account')
  , IndexController = require('./controllers/index')
  , CartController = require('./controllers/cart')
  , CategoryController = require('./controllers/category')
  , CheckoutController = require('./controllers/checkout')
  , ItemController = require('./controllers/item')
  , NavCategoriesController = require('./controllers/nav-categories')
  , SalesController = require('./controllers/sales')
  , NavLinksController = require('./controllers/nav-links')
  , BrandsController = require('./controllers/brands')
  , BrandController = require('./controllers/brand');

/**
 * Load the partials
 */

var notFound = require('../partials/404.js')
  , about = require('../partials/about.js')
  , account = require('../partials/account.js')
  , brand = require('../partials/brand.js')
  , brands = require('../partials/brands.js')
  , cart = require('../partials/cart.js')
  , checkout = require('../partials/checkout.js')
  , category = require('../partials/category.js')
  , contact = require('../partials/contact.js')
  , copyright = require('../partials/copyright.js')
  , item = require('../partials/item.js')
  , sales = require('../partials/sales.js')
  , linksNav = require('../partials/nav-links.js');

/**
 * Initialize the directives used outside of the controllers
 */

var i18nBind = require('./directives/i18n-bind')
  , lazyLoad = require('./directives/lazy-load')
  , track = require('./directives/track');

/**
 * Initialize the filters used outside of the controllers
 */

var i18n = require('./filters/i18n')
  , param = require('./filters/param')
  , slugify = require('./filters/slugify');

/**
 * Initialize the loading icon
 */

var loading = require('./lib/loading');

/**
 * Configure the app
 */

app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: sales,
        controller: SalesController
      })
      .when('/account', {
        templateUrl: account,
        controller: AccountController
      })
      .when('/categories/:slug/:category', {
        templateUrl: category,
        controller: CategoryController
      })
      .when('/brands', {
        templateUrl: brands,
        controller: BrandsController
      })
      .when('/brands/:slug/:brand', {
        templateUrl: brand,
        controller: BrandController
      })
      .when('/items/:slug/:item', {
        templateUrl: item,
        controller: ItemController,
        reloadOnSearch: false
      })
      .when('/contact', {
        templateUrl: contact
      })
      .when('/cart', {
        templateUrl: cart,
        controller: CartController
      })
      .when('/cart/checkout', {
        templateUrl: checkout,
        controller: CheckoutController,
        reloadOnSearch: false
      })
      .when('/about', {
        templateUrl: about
      })
      .when('/copyright', {
        templateUrl: copyright
      })
      .when('/auth/login', {
        redirectTo: '/'
      })
      .when('/unsubscribe', {
        redirectTo: '/'
      })
      .otherwise({
        templateUrl: notFound,
        controller: IndexController
      });

    $locationProvider.html5Mode(true);
  }
]);

/**
 * Listen for route changes
 */

app.run([
  '$rootScope',
  '$location',

  function($rootScope, $location) {
    var done;

    $rootScope.$on('$routeChangeStart', function(currentRoute, nextRoute) {
      done = log.profile('route_time');
    });

    $rootScope.$on('$routeChangeSuccess', function(currentRoute, previousRoute) {
      analytics.pageview();
      $rootScope.title = currentRoute.title || 'You start the sales';
      done({path: $location.path()});
    });
  }
]);
