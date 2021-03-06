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


  $scope.sectionMeta = [
    {
      id: 0,
      title: "Section A",
    },
    {
      id: 1,
      title: "Section B",
    },
    {
      id: 2,
      title: "Section C",
    }
  ]

  $scope.user = authService.getLoggedInUser();

  $scope.currentSection = 0;
  $scope.currentTitle = $scope.sectionMeta[$scope.currentSection].title;

  $scope.selectSection = function(id) {
    $scope.currentSection = id;
    $scope.currentTitle = $scope.sectionMeta[$scope.currentSection].title;
  }


}]);