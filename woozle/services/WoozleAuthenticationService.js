
'use strict';

angular.module('woozle')
    .factory('WoozleAuthenticationService', function (Restangular) {

        return {
            login: function(user, success, failed) {
                var authentication = Restangular.all('api/Auth/credentials?format=json');

                var data =
                {
                    "UserName": user.username,
                    "Password": user.password
                };

                // POST /Auth/credentials
                var result = authentication.post(data).then(success, failed);
            }
        };
    });