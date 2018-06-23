'use strict';

angular.module('myApp.home', ['ngRoute'])

.controller('HomeController', ['$scope',
                               '$window',
                               '$cookies',
                               '$timeout',
                               'apiService',
                               'modalService',
                               'storageService',
                               function($scope,
                                        $window,
                                        $cookies,
                                        $timeout,
                                        apiService,
                                        modalService,
                                        storageService) {

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
      $cookies.remove('auth');
      modalService.alert("Verifying", JSON.stringify(res.data));
    })
  }

  $scope.modalTest = function() {
    modalService.confirm("Confirmation test", "some text...").then(function(result){
      console.log("do stuff when confirmed...");
    });
  }
}]);