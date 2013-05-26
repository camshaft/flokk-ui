/**
 * Module dependencies
 */
var stack = require("simple-stack-common")
  , proxy = require("simple-http-proxy");

/**
 * Defines
 */
var API_URL = process.env.API_URL || "http://localhost:5001";

/**
 * Expose the app
 */
var app = module.exports = stack();

app.configure(function() {
  app.useBefore("router", "/public", "public", stack.middleware.static(__dirname+"/build", {maxAge: 3600}));
  app.useBefore("router", "/partials", "partialNotFound", function(req, res) {
    res.sendfile(__dirname+"/public/partials/404.nghtml");
  });
});

app.configure("development", function() {
  app.useBefore("base", "/api", "api-proxy", proxy(API_URL, {xforward: true}));
});

/**
 * Routes
 */
app.get("/*", function(req, res, next){
  res.sendfile(__dirname+"/public/index.html");
});
