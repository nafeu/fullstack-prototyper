'use strict';

app.directive('appName', ['APP_NAME', function(APP_NAME) {
  return function(scope, elm, attrs) {
    elm.text(APP_NAME);
  };
}]);

app.directive('appNameLong', ['APP_NAME_LONG', function(APP_NAME_LONG) {
  return function(scope, elm, attrs) {
    elm.text(APP_NAME_LONG);
  };
}]);
