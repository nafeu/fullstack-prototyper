'use strict';

angular.module('myApp.about', ['ngRoute'])

.controller('AboutController', ['$scope', 'authService', function($scope, authService) {

  $scope.user = authService.getLoggedInUser();

}]);