'use strict';

angular.module('myApp.home', ['ngRoute'])

.controller('HomeController', ['$scope',
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

  console.log("HomeController reporting for duty.");

  $scope.user = authService.getUserInfo();

}]);