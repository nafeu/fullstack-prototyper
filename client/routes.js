'use strict';

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/home', {
    templateUrl: 'templates/Home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/about', {
    templateUrl: 'templates/About.html',
    controller: 'AboutController'
  });

  $routeProvider.otherwise({redirectTo: '/home'});
}]);