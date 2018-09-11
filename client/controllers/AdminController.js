'use strict';

angular.module('myApp.admin', ['ngRoute'])

.controller('AdminController', ['$scope',
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

  console.log("AdminController reporting for duty.");

  $scope.user = authService.getLoggedInUser();
  $scope.users = [];

  apiService.getUsers($scope.user.token).then(function(res){
    console.log(res.data);
    $scope.users = res.data;
  })

}]);