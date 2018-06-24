'use strict';

app.directive('appName', ['APP_NAME', function(APP_NAME) {
  return function(scope, elm, attrs) {
    elm.text(APP_NAME);
  };
}]);
