'use strict';
angular.module('woozle')
    .controller('WoozleNavigationController',  ['$scope', 'WoozleLoginContextService', 'WoozleNavigationService',
        function ($scope, LoginContextService, NavigationService) {
        $scope.oneAtATime = true;
        $scope.showNavigation = false;
        $scope.loggedInUser = null;
        LoginContextService.refreshLoginContext();

        $scope.$on('loginContextChanged', function() {
            console.log("Receiving broadcast.");

            var isLoggedIn = LoginContextService.isLoggedIn();
            if(isLoggedIn) {
                    $scope.showNavigation = isLoggedIn;
                    $scope.loggedInUser = LoginContextService.loggedInUser();
                    NavigationService.getNavigation(function(navigation) {
                                        $scope.modules = navigation;
                                    }, function(error) {
                                    });

            } else {
                $scope.showNavigation = false;
                $scope.loggedInUser = null;
            }
        });

        $scope.logout = function () {
            LoginContextService.logout();
        };
    }]);
