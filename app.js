/**
 * Module dependencies
 */
var stack = require("simple-stack-common")
  , envs = require("envs")
  , auth = require("./lib/auth")
  , proxy = require("simple-http-proxy");

/**
 * Defines
 */
var API_URL = envs("API_URL", "https://api.theflokk.com");

/**
 * Expose the app
 */
var app = module.exports = stack();

/**
 * Serve the static assets
 *
 * @todo disable this stuff in prod
 */
app.useBefore("router", "/public", "public", stack.middleware.static(__dirname+"/build", {maxAge: 3600}));
app.useBefore("router", "/partials", "partialNotFound", function(req, res) {
  res.sendfile(__dirname+"/public/partials/404.nghtml");
});

/**
 * Use flokk authentication
 */
app.useBefore("router", "/auth/login", "auth:login", auth);
app.useBefore("router", "/auth/callback", "auth:callback", auth);
app.useBefore("router", "/auth/logout", "auth:logout", auth.logout);

/**
 * Proxy the api
 */
app.configure("development", function() {
  app.useBefore("base", "/api", "api-proxy", proxy(API_URL, {xforward: true}));
});

/**
 * Routes
 */
app.get("/*", function(req, res, next){
  res.sendfile(__dirname+"/public/index.html");
});
