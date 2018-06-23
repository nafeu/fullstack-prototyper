'use strict';

angular.module('myApp.about', ['ngRoute'])

.controller('AboutController', ['$scope', 'authService', function($scope, authService) {

  $scope.isLoggedIn = authService.isLoggedIn();

}]);