/**
 * Module dependencies
 */
var superagent = require("superagent")
  , accessToken = require("./access-token")
  , log = require("./log");

// TODO come up with a retry strategy
// TODO come up with a reasonable timeout
// TODO should we cache things in localStorage?
// TODO make it so we only call the root endpoint once

module.exports = exports = function() {
  return exports.get("/api");
};

exports.get = function() {
  return defaults(superagent.get.apply(superagent, arguments));
};

exports.post = function() {
  return defaults(superagent.post.apply(superagent, arguments));
};

exports.put = function() {
  return defaults(superagent.put.apply(superagent, arguments));
};

exports.del = function() {
  return defaults(superagent.del.apply(superagent, arguments));
};

function defaults(req) {
  req.set(accessToken.auth());

  req.skipCache = function() {
    this.set('cache-control', 'no-cache');
    return this;
  };

  // Patch the `end` function
  var _end = req.end;
  req.end = function(fn) {
    var done = log.profile("response_time")
      , self = this;

    _end.call(self, function(res) {
      // Setup some info
      var info = {method: req.method, url: req.url, code: res.status}
        , request_id = res.headers['x-request-id'];

      // Trace the request
      if (request_id) info.request_id = request_id;

      // Log the request
      done(info);

      // If the response was not ok return an error
      if (!res.ok) return self.emit("error", res.body || new Error(res.text));

      // Patch the res to allow following
      // TODO should we emit an error if the rel is not found?
      res.follow = function(rel) {
        var href = typeof res.body[rel] === "object"
          ? res.body[rel].href
          : res.body[rel];

        return exports.get(href);
      };

      fn(res);
    });
  };

  return req;
};
