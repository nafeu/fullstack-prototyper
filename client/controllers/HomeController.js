'use strict';

angular.module('myApp.home', ['ngRoute'])

.controller('HomeController', ['$scope', '$cookies', 'apiService', 'storageService', function($scope, $cookies, apiService, storageService) {

  $scope.email = "";
  $scope.password = "";
  $scope.token = "";

  $scope.register = function(email, password) {
    apiService.register(email, password).then(function(res){
      $cookies.put('auth', res.data.token);
      console.log("AUTH: ", $cookies.get('auth'));
    })
  }

  $scope.authenticate = function(email, password) {
    apiService.authenticate(email, password).then(function(res){
      $cookies.put('auth', res.data.token);
      console.log("AUTH: ", $cookies.get('auth'));
    })
  }

  $scope.verify = function(token) {
    apiService.verify(token).then(function(res){
      console.log("VERIFYING: ", $cookies.get('auth'));
      console.log(res.data);
      $cookies.remove('auth');
      console.log("REMOVED");
    })
  }

}]);