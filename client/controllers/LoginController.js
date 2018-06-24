'use strict';

angular.module('myApp.login', ['ngRoute'])

.controller('LoginController', ['$scope',
                                '$window',
                                '$location',
                                'apiService',
                                'authService',
                                'modalService',
                                'storageService',
                                function($scope,
                                         $window,
                                         $location,
                                         apiService,
                                         authService,
                                         modalService,
                                         storageService)
{

  console.log("LoginController reporting for duty");

  $scope.credentials = {
    email: "",
    password: ""
  };

  $scope.apiError = "";

  $scope.login = function() {
    if ($scope.loginForm.$valid) {
      authService.login($scope.credentials.email, $scope.credentials.password, function(res){
        $location.path("/dashboard").search({});
      }, function(error){
        $scope.apiError = error;
      });
    }
  }

  $scope.goBack = function() {
    $window.history.back();
  }

}]);