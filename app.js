
/**
 * Module dependencies.
 */

var express = require("express"),
    pack = require("stack-angular"),
    fs = require("fs");

var app = module.exports = express();

var indexView;

var stack = pack({
  cdn: true,
  static: __dirname+"/public",
  index: function(send) {
    if (indexView) {
      send(null, indexView);
    }
    else {
      fs.readFile(__dirname+"/public/index.html", function(err, html) {
        if (err) send(err);
        if (process.env.NODE_ENV === "production") {
          indexView = html;
        }
        send(err, html);
      });
    }
  },
  blacklist: [
    "/partials",
    "/js",
    "/css",
    "/img"
  ]
});

app.configure(function(){
  app.set("x-powered-by", false);
  app.use(stack);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.configure('test', function(){
  stack.remove("logger");
});
