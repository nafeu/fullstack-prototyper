'use strict';

app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
  $rootScope.$on('$routeChangeStart', function (event) {
    var isLoggedIn = authService.isLoggedIn();
    var currPath = $location.path();
    console.log("Route change -> " + currPath + " --- Auth: " + isLoggedIn);
    if (!isLoggedIn
        && currPath != '/login'
        && currPath != '/register'
        && currPath != '/about'
        && currPath != '/') {
      $location.path('/login').replace().search({redirect: currPath.substring(1)});
    } else if (isLoggedIn && (currPath == '/login' || currPath == '/register')) {
      $location.path('/logout').replace().search({redirect: currPath.substring(1)});
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