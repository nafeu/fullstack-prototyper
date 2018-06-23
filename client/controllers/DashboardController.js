'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.controller('DashboardController', ['$scope',
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

  console.log("DashboardController reporting for duty.");

  $scope.user = authService.getUserInfo();

}]);