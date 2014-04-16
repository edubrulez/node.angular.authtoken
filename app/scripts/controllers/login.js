'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('imageRepositoryApp.controllers')

  // Path: /login
  .controller('LoginCtrl', ['$scope', '$location', '$window', '$http', '$rootScope', 'authService', 'modalService', 'modelStateService', function ($scope, $location, $window, $http, $rootScope, authService, modalService, modelStateService) {
    $rootScope.loggedIn = false;
      //$scope.$root.title = 'ImageRepository | Sign In';

    $scope.openLogin = function () {
      modalService.login();
    };

    $scope.register = function (user) {
      $http.put('api/register', user)
        .success(function () {
          $scope.login(user);
          $location.url('/secure');
        })
        .error(function (data) {
          $scope.registrationFailed = true;
          $scope.errors = data.ModelState ? modelStateService.getErrors(data.ModelState) : {};
        });
    };

    $scope.login = function (user) {
      $rootScope.invalidLogin = false;

      $http({
        method: 'POST',
        url: '/oauth/token',
        data: 'grant_type=password&client_id=mobileV1&client_secret=abc123456&username=' + user.username + '&password=' + user.password,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function (data) { //, status, headers, config
        $http.defaults.headers.common.authorization = 'Bearer ' + data.access_token;  //http://stackoverflow.com/questions/19769422/net-web-api-2-owin-bearer-token-authentication  ['Authorization']  access_token
        authService.loginConfirmed();
        $rootScope.loggedIn = true;
      })
      .error(function () { //data, status, headers, config
        authService.loginCanceled();
        $rootScope.loggedIn = false;
        $rootScope.invalidLogin = true;
      });

      return false;
    };

    $scope.cancelLogin = function() {
      authService.loginCanceled();
      $rootScope.loggedIn = false;
      modalService.close();
      $location.url('/');
    };

    $scope.logout = function (user) {
      //$rootScope.message = 'Logged out.';
      $http.defaults.headers.common.authorization = ''; // ['Authorization'] = '';
      $rootScope.loggedIn = false;

      $http.post('api/account/logout', user);

      $location.url('/');
    };

    $scope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
  }]);