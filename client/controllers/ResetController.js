'use strict';

angular.module('myApp.reset', ['ngRoute'])

.controller('ResetController', ['$scope',
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

  console.log("RegisterController reporting for duty");

  $scope.user = authService.getLoggedInUser();

  var redirect = $routeParams.redirect;

  $scope.credentials = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  $scope.errorAlert = "";

  $scope.resetPassword = function() {
    if ($scope.resetForm.$valid
        && $scope.credentials.confirmNewPassword === $scope.credentials.newPassword
        && $scope.credentials.newPassword.length >= 8)
    {
      authService.resetPassword($scope.credentials.oldPassword, $scope.credentials.newPassword, function(res){
        modalService.alert("Password Reset Successful", "Password has been reset for " + res.email);
        if (redirect) {
          $location.path("/" + redirect).search({});
        } else {
          $location.path("/dashboard").search({});
        }
      }, function(error){
        $scope.errorAlert = error;
      });
    }
  }

  $scope.prompt = {
    message: "Password Reset",
    description: "Currently logged in as " + $scope.user.email
  }

  $scope.goBack = function() {
    $window.history.back();
  }

}]);