'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'apiService', 'storageService', function($scope, apiService, storageService) {

  $scope.email = "";
  $scope.password = "";
  $scope.token = "";

  $scope.register = function(email, password) {
    apiService.register(email, password).then(function(res){
      console.log(res);
    })
  }

  $scope.authenticate = function(email, password) {
    apiService.authenticate(email, password).then(function(res){
      console.log(res);
    })
  }

  $scope.verify = function(token) {
    apiService.verify(token).then(function(res){
      console.log(res);
    })
  }

}]);