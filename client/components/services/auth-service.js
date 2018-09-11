'use strict';

app.service('authService', ['$cookies', 'apiService', function($cookies, apiService) {

  this.isAuth = function() {
    return new Promise(function(resolve, reject) {
      apiService.verify($cookies.get('auth')).then(function(res){
        if (res.data.error) {
          reject(res.data.error);
        }
        resolve(res.data.authorized);
      })
    })
  }

  this.register = function(email, password, resolve, reject) {
    apiService.register(email, password).then(function(res){
      if (res.data.error) {
        reject(res.data.error);
      } else {
        resolve(res.data);
      }
    })
  }

  this.login = function(email, password, resolve, reject) {
    apiService.authenticate(email, password).then(function(res){
      if (res.data.error) {
        reject(res.data.error);
      } else {
        $cookies.putObject('auth', res.data);
        resolve(res.data);
      }
    })
  }

  this.loginByToken = function(token, resolve, reject) {
    apiService.verify(token).then(function(res){
      if (res.data.error) {
        reject(res.data.error);
      } else {
        $cookies.putObject('auth', res.data);
        resolve(res.data);
      }
    })
  }

  this.logout = function(resolve) {
    $cookies.remove('auth');
    resolve();
  }

  this.getAuth = function() {
    var userObject = $cookies.getObject('auth');
    if (userObject) {
      if (userObject.email && userObject.token && userObject.role) {
        return {
          isLoggedIn: true,
          isAdmin: (userObject.role == 'admin')
        };
      }
    }
    return false;
  }

  this.getLoggedInUser = function() {
    var userObject = $cookies.getObject('auth');
    if (userObject) {
      return userObject;
    }
    return null;
  }

  this.resetPassword = function(oldPassword, newPassword, resolve, reject) {
    apiService.resetPassword($cookies.getObject('auth').token, oldPassword, newPassword).then(function(res){
      if (res.data.error) {
        reject(res.data.error);
      } else {
        resolve(res.data);
      }
    });
  }

  this.sendMagicLink = function(email, resolve, reject) {
    apiService.sendMagicLink(email).then(function(res){
      if (res.data.error) {
        reject(res.data.error);
      } else {
        resolve(res.data);
      }
    })
  }
}]);
