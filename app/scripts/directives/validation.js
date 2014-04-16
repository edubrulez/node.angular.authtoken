'use strict';

angular.module('imageRepositoryApp.directives')
  .directive('sameAs', ["$parse", function($parse) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var me = attrs.ngModel;
        var matchTo = attrs.sameAs;

        scope.$watch(me, function() {
          ctrl.$setValidity('sameAs', $parse(me)(scope) === $parse(matchTo)(scope));
        });
        scope.$watch(matchTo, function() {
          ctrl.$setValidity('sameAs', $parse(me)(scope) === $parse(matchTo)(scope));
        });
      }
    };
  }]);