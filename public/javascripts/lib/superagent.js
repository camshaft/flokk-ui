/**
 * Module dependencies
 */
var superagent = require("superagent")
  , accessToken = require("./access-token")
  , log = require("./log");

// TODO come up with a retry strategy
// TODO come up with a reasonable timeout
// TODO should we cache things in localStorage?

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

  // Patch the `end` function
  var _end = req.end;
  req.end = function(fn) {
    var done = log.profile("response_time");

    _end.call(this, function(res) {
      var info = {method: req.method, url: req.url, code: res.status}
        , request_id = res.headers['x-request-id'];

      if (request_id) info.request_id = request_id;

      done(info);
      fn(res);
    });
  };

  return req;
};
