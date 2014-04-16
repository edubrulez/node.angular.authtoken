'use strict';

angular.module('imageRepositoryApp.services')
    .factory('modelStateService', function () {
        return {
            getErrors: function (modelState) {
                var errors = [];

                angular.forEach(modelState, function(value) { //, key
                    angular.forEach(value, function(v) { //, k
                        this.push(v);
                      }, errors);
                  });

                return errors;
              }
          };
      });