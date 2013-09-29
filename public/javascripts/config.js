/**
 * Module dependencies
 */

var app = require('.');
var envs = require('envs');
var token = require('access-token');

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
 * Initialize fastclick
 */

window.attachFastClick = require('fastclick');

/**
 * Initialize the controllers
 */

var AccountController = require('./controllers/account');
var IndexController = require('./controllers/index');
var CartController = require('./controllers/cart');
var CategoryController = require('./controllers/category');
var CheckoutController = require('./controllers/checkout');
var ItemController = require('./controllers/item');
var SalesController = require('./controllers/sales');
var BrandsController = require('./controllers/brands');
var BrandController = require('./controllers/brand');

/**
 * Initialize the aux controllers
 */

require('./controllers/nav-categories');
require('./controllers/nav-links');

/**
 * Load the partials
 */

var notFound = require('../partials/404.js');
var about = require('../partials/about.js');
var account = require('../partials/account.js');
var brand = require('../partials/brand.js');
var brands = require('../partials/brands.js');
var cart = require('../partials/cart.js');
var checkout = require('../partials/checkout.js');
var category = require('../partials/category.js');
var contact = require('../partials/contact.js');
var copyright = require('../partials/copyright.js');
var item = require('../partials/item.js');
var sales = require('../partials/sales.js');

/**
 * Load the aux partials
 */

require('../partials/nav-links.js');

/**
 * Initialize the directives used outside of the controllers
 */

require('./directives/i18n-bind');
require('./directives/lazy-load');
require('./directives/feature');
require('./directives/track');

/**
 * Initialize the filters used outside of the controllers
 */

require('./filters/i18n');
require('./filters/param');
require('./filters/slugify');

/**
 * Initialize the loading icon
 */

require('./lib/loading');

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

    $rootScope.$on('$routeChangeStart', function() {
      done = log.profile('route_time');
    });

    $rootScope.$on('$routeChangeSuccess', function(currentRoute) {
      analytics.pageview();
      $rootScope.title = currentRoute.title || 'You start the sales';
      done({path: $location.path()});
    });
  }
]);

/**
 * Enable the feature-ui
 */

require('feature-ui')();
