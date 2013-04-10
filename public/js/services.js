var s = angular.module("flokk.services", []);

s.factory("categories", [
  "$http",
  function($http) {
    return function(done) {
      $http.get("/api/categories.json").success(function(data, status, headers, config) {
        done(null, data);
      }).error(function(data, status, headers, config) {
        done(status, data);
      });
    };
  }
]);

s.factory("cart", [
  "$http",
  function($http) {
    return function(done) {
      $http.get("/api/cart.json").success(function(data, status, headers, config) {
        done(null, data);
      }).error(function(data, status, headers, config) {
        done(status, data);
      });
    };
  }
]);


s.factory("request", [
  "$http",
  function($http) {
    return function(doc, done) {
      $http.get(doc._links.self.href).success(function(data, status, headers, config) {
        done(null, data);
      }).error(function(data, status, headers, config) {
        done(status, data);
      });
    };
  }
]);

s.factory("codes", [
  "$http",
  function($http) {
    return function(locale, done) {
      switch(locale) {
        case 'es':
          done(null, {
            "no_sales":"No hay rebajas en este momento. Compra para empezar una nueva!",
            "category.sales": "Rebajas",
            cart: "Carro (%{smart_count})",
            account_link: "Cuenta",
            "category.woman": "Mujer",
            "category.man": "Hombre",
            "category.kids": "Ninos",
            "item.price": "€ %{price}"
          });
          break;
        default:
          done(null, {
            cart: "Cart (%{smart_count})",
            "item.price": "$ %{price}",
            "category.sales": "Sales",
            "account_link": "Account"
          });
          break;
      }
      
    };
  }
]);

s.factory("i18n", [
  'codes',
  function(codes) {

    var p = new Polyglot;

    codes('en', function(err, translations) {
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
    return {
      t: function(key, options) {
        return p.t(key, options);
      },
      phrase: function(key) {
        return p.phrases[key];
      },
      update: function(key, value) {
        // TODO save to server
        console.log("updating '"+key+"' to '"+value+"'");
        p.phrases[key] = value;
      }
    };
  }
]);