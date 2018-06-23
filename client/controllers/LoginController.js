'use strict';

angular.module('myApp.login', ['ngRoute'])

.controller('LoginController', ['$scope',
                                '$window',
                                '$timeout',
                                '$location',
                                'apiService',
                                'authService',
                                'modalService',
                                'storageService',
                                function($scope,
                                         $window,
                                         $timeout,
                                         $location,
                                         apiService,
                                         authService,
                                         modalService,
                                         storageService)
{

  console.log("LoginController reporting for duty");

  $scope.isLoggedIn = authService.isLoggedIn();

  $scope.email = "";
  $scope.password = "";
  $scope.error = "";

  $scope.login = function() {
    authService.login($scope.email, $scope.password, function(res){
      $location.path("/dashboard");
    }, function(error){
      $scope.error = error;
    });
  }

}]);