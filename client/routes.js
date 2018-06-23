'use strict';

app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
  $rootScope.$on('$routeChangeStart', function (event) {
    var isLoggedIn = authService.isLoggedIn();
    console.log("Route change -> " + $location.path() + " --- Auth: " + isLoggedIn);
    if (!isLoggedIn
        && $location.path() != '/login'
        && $location.path() != '/register'
        && $location.path() != '/about'
        && $location.path() != '/') {
      $location.path('/login');
    } else if (isLoggedIn && ($location.path() == '/login' || $location.path() == '/register')) {
      $location.path('/logout');
    }
  });
}]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/', {
    templateUrl: 'templates/Home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/login', {
    templateUrl: 'templates/Login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/logout', {
    templateUrl: 'templates/Logout.html',
    controller: 'LogoutController'
  });

  $routeProvider.when('/register', {
    templateUrl: 'templates/Register.html',
    controller: 'RegisterController'
  });

  $routeProvider.when('/dashboard', {
    templateUrl: 'templates/Dashboard.html',
    controller: 'DashboardController'
  });

  $routeProvider.when('/about', {
    templateUrl: 'templates/About.html',
    controller: 'AboutController'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);