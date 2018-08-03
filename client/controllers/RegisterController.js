'use strict';

angular.module('myApp.register', ['ngRoute'])

.controller('RegisterController', ['$scope',
                                   '$window',
                                   '$location',
                                   'authService',
                                   'modalService',
                                   function($scope,
                                            $window,
                                            $location,
                                            authService,
                                            modalService)
{

  console.log("RegisterController reporting for duty");

  $scope.credentials = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  $scope.errorAlert = "";

  $scope.register = function() {
    if ($scope.registrationForm.$valid
        && $scope.credentials.confirmPassword === $scope.credentials.password
        && $scope.credentials.password.length >= 8)
    {
      authService.register($scope.credentials.email, $scope.credentials.password, function(res){
        modalService.alert("New Account Created",
                           "New account successfully registered. A link to verify your email address has been sent to " + $scope.credentials.email);
        $location.path("/login").search({});
      }, function(error){
        $scope.errorAlert = error;
      });
    }
  }

  $scope.goBack = function() {
    $window.history.back();
  }

}]);