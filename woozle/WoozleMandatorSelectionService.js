'use strict';

angular.module('woozle')
    .factory('WoozleMandatorSelectionService', function (Restangular) {

        return {
            getAssignedMandators: function (success, error) {
                return Restangular.one('api/mandatorsForSelection?format=json')
                                  .getList()
                                  .then(success, error);
            },
            selectMandator: function (mandator, success, failed) {
                var mandatorSelection = Restangular.all('api/mandatorselect?format=json');

                var data =
                {
                    "SelectedMandator": mandator
                };

                // POST /mandatorselect
                var result = mandatorSelection.post(data).then(success, failed);
            }
        };
    });