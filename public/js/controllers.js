var c = angular.module("flokk.controllers", []);

c.controller("SidenavController", [
  "$rootScope",
  "$scope",
  "$location",

  function SidenavController($rootScope, $scope, $location) {
    $scope.$watch('$location.path()', function(hash) {
      $scope.openCategory = hash;
    });

    $scope.changeCategory = function(rel) {
      $scope.categories.forEach(function(cat) {
        cat.show = ($rootScope.page == rel)?false:(cat.rel == rel);
      });
      $rootScope.page = ($rootScope.page == rel)?null:rel;
    };

    $scope.categories = [
      {
        title: "WOMAN",
        show: false,
        rel: "woman",
        subcategories: [
          {title: "Coats", rel: "coats"},
          {title: "Blazers", rel: "blazers"},
          {title: "Dresses", rel: "dresses"},
          {title: "Shirts", rel: "shirts"},
          {title: "Trousers", rel: "trousers"},
          {title: "Jeans", rel: "jeans"},
          {title: "Skirts", rel: "skirts"},
          {title: "Knitwear", rel: "knitwear"},
          {title: "T-shirts", rel: "t-shirts"},
          {title: "Shoes", rel: "shoes"},
          {title: "Handbags", rel: "handbags"},
          {title: "Accessories", rel: "accessories"}
        ]
      },
      {
        title: "MAN",
        show: false,
        rel: "man",
        subcategories: [
          {title: "Coats", rel: "coats"},
          {title: "Jackets", rel: "jackets"},
          {title: "Blazers", rel: "blazers"},
          {title: "Trousers", rel: "trousers"},
          {title: "Jeans", rel: "jeans"},
          {title: "T-shirts", rel: "t-shirts"},
          {title: "Shirts", rel: "shirts"},
          {title: "Knitwear", rel: "knitwear"},
          {title: "Shoes", rel: "shoes"},
          {title: "Bags", rel: "bags"},
          {title: "Accessories", rel: "accessories"},
          {title: "Homewear", rel: "homewear"}
        ]
      },
      {
        title: "KIDS",
        show: false,
        rel: "kids",
        subcategories: [
          {title: "Girl", rel: "girl"},
          {title: "Boy", rel: "boy"},
          {title: "Baby Girl", rel: "baby-girl"},
          {title: "Baby Boy", rel: "baby-boy"}
        ]
      }
    ]
  }
]);

c.controller("ProductsController", [
  "$scope",

  function ProductsController($scope) {
    $scope.items = [
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/4963/352/751/1/4963352751_1_1_4.jpg?timestamp=1348215127342"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      },
      {
        title: "TRENCH COAT WITH DETACHABLE LINING",
        price: 79.99,
        retail: 189.99,
        thumbnail: "http://static.zara.net/photos//2012/I/0/2/p/0367/347/801/1/0367347801_1_1_4.jpg?timestamp=1348837387016"
      }
    ]
  }
]);

c.controller("CartController", [
  "$scope",

  function CartController($scope) {

    $scope.cart = {
      items: []
    }
  }
]);

c.controller("AccountController", [
  "$scope",

  function AccountController($scope) {

  }
]);

c.controller("RootController", [
  "$scope",
  "$location",

  function RootController($scope, $location) {
    $scope.$watch('$location.path()', function(path) {
      console.log($location.path());

      switch($location.path()) {
        case "/cart":
          $scope.nav = "cart";
          break;
        case "/account":
          $scope.nav = "account";
          break;
        default:
          $scope.nav = "";
          break;
      }
    });
  }
]);

