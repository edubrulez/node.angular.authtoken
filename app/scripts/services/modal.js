'use strict';

angular.module('imageRepositoryApp.services')
    .factory('modalService', function ($modal) {
        var modalInstance;

        return {
            login: function() {
                //var partialsRoot = 'partials';

                if (modalInstance != null) {
                  modalInstance.close();
                }

                modalInstance = $modal.open({
                    templateUrl: '/views/partials/login.html',
                    controller: 'LoginCtrl',
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true
                  });

                modalInstance.result.then(function () { //response) {
                    //$scope.selected = response;
                    //console.log(response);
                }, function () {
                    modalInstance = null;
                  });

              },

            close: function () {
                if (modalInstance === null) {return;}

                modalInstance.close();
                modalInstance = null;
              }
          };
      });