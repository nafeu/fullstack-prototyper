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

  $scope.loginButton = "Sign In";
  $scope.sendMagicLinkButton = "Send Link";

  $scope.credentials = {
    email: "",
    password: ""
  };

  $scope.apiError = "";

  $scope.login = function() {
    $scope.loginButton = "Signing In...";
    if ($scope.loginForm.$valid) {
      authService.login($scope.credentials.email, $scope.credentials.password, function(res){
        $scope.loginButton = "Sign In";
        $location.path("/dashboard").search({});
      }, function(error){
        $scope.loginButton = "Sign In";
        $scope.apiError = error;
      });
    }
  }

  $scope.sendMagicLink = function() {
    $scope.sendMagicLinkButton = "Sending Link...";
    if ($scope.magicForm.$valid) {
      authService.sendMagicLink($scope.credentials.email, function(res){
        $scope.sendMagicLinkButton = "Send Link";
        modalService.alert("Magic Link Sent", "A link has been sent to \"" + $scope.credentials.email + "\". You can use it to sign in.");
      }, function(error){
        $scope.sendMagicLinkButton = "Send Link";
        $scope.apiError = error;
      });
    }
  }

  $scope.goBack = function() {
    $window.history.back();
  }

}]);