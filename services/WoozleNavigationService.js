'use strict';

angular.module('woozle')
    .factory('WoozleNavigationService', function (Restangular) {

        return {
            getNavigation: function (success, error) {
                return Restangular.one('api/navigation?format=json')
				                  .getList()
				                  .then(success, error);
            }
        };
    });