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
    password: ""
  };

  $scope.apiError = "";

  $scope.register = function() {
    if ($scope.registrationForm.$valid) {
      authService.register($scope.credentials.email, $scope.credentials.password, function(res){
        modalService.alert("New Account Created", "New account successfully registered for " + $scope.credentials.email);
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