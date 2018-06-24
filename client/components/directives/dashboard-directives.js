'use strict';

app.directive('dashboardHeader',  function() {
  return {
    templateUrl: 'templates/partials/dashboard-header.html'
  };
});

app.directive('dashboardSidebarResources',  function() {
  return {
    templateUrl: 'templates/partials/dashboard-sidebar-resources.html'
  };
});