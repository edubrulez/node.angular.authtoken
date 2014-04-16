'use strict';

//angular.module('app.controllers', ['http-auth-interceptor', 'app.services', 'angular_taglist_directive', 'ui.bootstrap', 'angularFileUpload']);
angular.module('imageRepositoryApp.controllers', ['http-auth-interceptor', 'imageRepositoryApp.services']);
angular.module('imageRepositoryApp.services', ['ui.bootstrap']);
angular.module('imageRepositoryApp.directives', []);

angular.module('imageRepositoryApp', ['ui.router', 'ui.bootstrap', 'imageRepositoryApp.controllers', 'imageRepositoryApp.services', 'imageRepositoryApp.directives', 'http-auth-interceptor'])
  .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'partials/register',
        controller: 'LoginCtrl'
      })
      .state('secure', {
        url: '/secure',
        templateUrl: 'partials/secure',
        controller: 'SecureCtrl'
      })
      .state('otherwise', {
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }])

  .run(['$templateCache', '$rootScope', '$state', '$stateParams', 'modalService', function($templateCache, $rootScope, $state, $stateParams, modalService){
    var view = angular.element('#ui-view');
    $templateCache.put(view.data('tmpl-url'), view.html());

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeSuccess', function (event, toState){
      $rootScope.layout = toState.layout;
    });

    $rootScope.$on('event:auth-loginRequired', function () {
      modalService.login();
    });

    $rootScope.$on('event:auth-loginConfirmed', function () {
      modalService.close();
    });
  }]);
