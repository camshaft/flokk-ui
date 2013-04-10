var d = angular.module("flokk.directives", []);

d.directive("bindI18n", [
  "i18n",
  function(i18n) {
    return {
      restrict: 'A',
      link: function($scope, element, attr) {
        var keyExp = attr["bindI18n"];

        var keyEvaled = $scope.$eval(keyExp);
        var key;
        var options;

        if (typeof keyEvaled === "string") {
          key = keyEvaled
        }
        else {
          key = keyEvaled.key;
          options = keyEvaled;
        }

        var isEditing = false;

        var saveChanges = function() {
          if (!isEditing) return;
          isEditing = false;
          i18n.update(key, element.text());
          element.attr('contenteditable', false);
          element.html(i18n.t(key, options));
          element[0].blur();
          $scope.$digest();
        };

        // TODO check if the user has permission to translate
        if (true) {
          element.bind('click', function(e) {
            if (!isEditing && e.shiftKey && e.altKey) {
              isEditing = true;
              element.attr('contenteditable', true);
              element.html(i18n.phrase(key));
              element[0].focus();
              e.stopPropagation();
              return false;
            }
            if (isEditing) {
              e.stopPropagation();
              return false;
            }
          });

          element.bind('keypress', function(e) {
            if (e.keyCode == 13) {
              saveChanges();
            };
          });
          element.bind('blur', saveChanges);
        };

        $scope.$watch(key, function() {
          var evaledExp = $scope.$eval(keyExp)

          if (typeof evaledExp === "object") {
            options = evaledExp;
          }

          element.html(i18n.t(key, options));
        });
        
        element.html(i18n.t(key, options));
      }
    }
  }
]);