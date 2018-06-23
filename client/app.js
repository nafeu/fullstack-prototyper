'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.about',
  'myApp.home',
]);

app.constant('STORAGE_ID', 'fsproto');