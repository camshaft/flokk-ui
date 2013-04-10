var f = angular.module("flokk.filters", []);

f.filter("i18n", [
  'codes',
  function(codes) {
    var p = new Polyglot;

    codes('es', function(err, translations) {
      p.extend(translations);
      // Monkey patch it!
      var t = p.t;
      p.t = function(key, options) {
        if (!this.phrases[key]) {
          // console.log(options.d);
        }
        return t.apply(p, [key, options]);
      };
    });
    return function(key, options) {
      return p.t(key, options);
    };
  }

]);
