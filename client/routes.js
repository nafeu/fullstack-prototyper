'use strict';

app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
  $rootScope.$on('$routeChangeStart', function (event) {
    var auth = authService.getAuth();
    var currPath = $location.path();
    console.log("Route change -> " + currPath + " --- Auth: " + JSON.stringify(auth));
    if (!auth.isLoggedIn
        && currPath != '/login'
        && currPath != '/register'
        && currPath != '/about'
        && currPath != '/'
        && currPath != '') {
      $location.path('/login').replace().search({redirect: currPath.substring(1)});
    } else if (auth.isLoggedIn && (currPath == '/login' || currPath == '/register')) {
      $location.path('/logout').replace().search({redirect: currPath.substring(1)});
    } else if (auth.isLoggedIn && !auth.isAdmin && (currPath == '/admin')) {
      $location.path('/account');
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

  $routeProvider.when('/account', {
    templateUrl: 'templates/Account.html',
    controller: 'AccountController'
  });

  $routeProvider.when('/admin', {
    templateUrl: 'templates/Admin.html',
    controller: 'AdminController'
  });

  $routeProvider.when('/reset', {
    templateUrl: 'templates/Reset.html',
    controller: 'ResetController'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);