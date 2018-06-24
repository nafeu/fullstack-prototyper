'use strict';

app.filter('interpolate', ['APP_VERSION', function(APP_VERSION) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, APP_VERSION);
  };
}]);
