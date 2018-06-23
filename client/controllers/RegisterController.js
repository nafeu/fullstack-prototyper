'use strict';

angular.module('myApp.register', ['ngRoute'])

.controller('RegisterController', ['$scope',
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

  console.log("RegisterController reporting for duty");

  $scope.user = authService.getUserInfo();

  $scope.email = "";
  $scope.password = "";
  $scope.error = "";

  $scope.register = function() {
    authService.register($scope.email, $scope.password, function(res){
      modalService.alert("New Account Created", "New account successfully registered for " + $scope.email);
      $location.path("/dashboard");
    }, function(error){
      $scope.error = error;
    });
  }

}]);