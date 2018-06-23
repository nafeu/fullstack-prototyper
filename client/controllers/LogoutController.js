'use strict';

angular.module('myApp.logout', ['ngRoute'])

.controller('LogoutController', ['$scope',
                                '$window',
                                '$timeout',
                                'apiService',
                                'authService',
                                'modalService',
                                'storageService',
                                function($scope,
                                         $window,
                                         $timeout,
                                         apiService,
                                         authService,
                                         modalService,
                                         storageService)
{

  console.log("LogoutController reporting for duty");

  $scope.isLoggedIn = authService.isLoggedIn();

  $scope.logout = function() {
    authService.logout();
  }

}]);