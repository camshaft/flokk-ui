/**
 * Module dependencies
 */
var stack = require("simple-stack-common");

/**
 * Expose the app
 */
var app = module.exports = stack();

app.configure(function() {
  app.useBefore("router", "/public", "public", stack.middleware.static(__dirname+"/build"));
});

app.configure("development", function() {
  app.useBefore("router", "/partials", function partialContentType(req, res, next) {
    res.type("html");
    next();
  });
  app.useBefore("router", "/partials", "partials", stack.middleware.static(__dirname+"/public/partials"));
  app.useBefore("router", "/partials", "partialNotFound", function(req, res) {
    res.sendfile(__dirname+"/public/partials/404.nghtml");
  });
});

/**
 * Routes
 */
app.get("/*", function(req, res, next){
  res.sendfile(__dirname+"/public/index.html");
});
