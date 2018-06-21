'use strict';

app.service('apiService', function($http) {
  this.register = function(email, password) {
    return $http.post("api/register", {
      email: email,
      password: password
    });
  }

  this.authenticate = function(email, password) {
    return $http.post("api/authenticate", {
      email: email,
      password: password
    });
  }

  this.verify = function(token) {
    return $http.post("api/verify", {
      token: token
    })
  }
});
