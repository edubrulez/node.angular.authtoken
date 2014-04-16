'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('imageRepositoryApp.controllers')

  // Path: /about
  .controller('SecureCtrl', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
    $scope.$root.title = 'ImageRepository | Secured Resource';

    $http.get('/api/secure')
      .success(function(user) {
          $scope.returnedUser = user;
        });

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
  }]);