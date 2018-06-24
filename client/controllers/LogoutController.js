'use strict';

angular.module('myApp.logout', ['ngRoute'])

.controller('LogoutController', ['$scope',
                                 '$window',
                                 '$location',
                                 '$routeParams',
                                 'authService',
                                 'modalService',
                                 function($scope,
                                          $window,
                                          $location,
                                          $routeParams,
                                          authService,
                                          modalService)
{

  console.log("LogoutController reporting for duty");

  $scope.user = authService.getUserInfo();

  var redirect = $routeParams.redirect;

  $scope.logout = function() {
    authService.logout(function(){
      if (redirect) {
        $location.path("/" + redirect).search({});
      } else {
        $location.path("/").search({});
      }
    });
  }

  $scope.prompt = {
    message: "Are you sure you want to log out?",
    description: "Currently logged in as " + $scope.user.email + "\nAny unsaved changes will be lost."
  }

  if (redirect == 'login' || redirect == 'register') {
    $scope.prompt.message = "You must logout to continue.";
  }

  $scope.goBack = function() {
    $window.history.back();
  }

}]);