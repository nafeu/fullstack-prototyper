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

  $scope.user = authService.getUserInfo();

  $scope.logout = function() {
    authService.logout();
  }

}]);