'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.about',
  'myApp.account',
  'myApp.reset',
  'myApp.login',
  'myApp.logout',
  'myApp.register',
  'myApp.home',
  'myApp.dashboard',
  'ui.bootstrap',
]);