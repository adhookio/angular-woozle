'use strict';

angular.module('woozle')
    .controller('WoozleLoginController',
        ['$rootScope', '$scope', '$location', '$window',
            'WoozleAuthenticationService', 'WoozleMandatorSelectionService', 'WoozleLoginContextService', '$modal',
            function ($rootScope, $scope, $location, $window,
                AuthenticationService, MandatorSelectionService, LoginContextService, $modal) {

                $scope.rememberme = true;
                $scope.showProgress = false;

                $scope.login = function () {

                $scope.showProgress = true;
                //Get username and password using JQuery to make the browser specific "Save Password" functionality working!
                var user = {"username" : $("#username").val(), "password" : $("#password").val()};

                console.log("Try to login");
                console.log(user);

                //Try to Login
                AuthenticationService.login(user, function() {
                        console.log("Login was successful");
                        if ($scope.mandator != null) {
                            //Mandator was chosen by the user -> Login successful
                            $scope.selectMandator();
                        } else {
                            LoginContextService.getLoginContext(
                            function(loginContext) {
                                //Only one mandator -> Login successful
                               LoginContextService.setLoginData(loginContext.User, loginContext.Mandator);
                               $location.path('/main');
                            },
                            function(error) {
                                if (error.status == 601) {
                                    //The user needs to select the desired mandator
                                    MandatorSelectionService.getAssignedMandators(function(mandators) {
                                        console.log("getting assigned mandators.");
                                        console.log(mandators);
                                        $scope.mandators = mandators;
                                        $scope.mandator = mandators[0];
                                        $scope.showProgress = false;
                                    }, function(error) {
                                        console.log("error at getting mandators");
                                        console.log(error);
                                    });
                                } else if (error.status == 403) {
                                  $scope.openLoginErrorAlert("Sie verfügen über zu wenig Berechtigungen, um sich am TIA Backend anzumelden.");
                                } else {
                                    console.log(error);
                                    $scope.openLoginErrorAlert("Sie konnten nicht angemeldet werden.");
                                }
                            });
                        }
                }, function(error) {
                    console.log(error);
                    $scope.openLoginErrorAlert("Der eingegebene Benutzername und/oder das Passwort ist ungültig. Sie konnten nicht angemeldet werden.");
                });
               
            };
            $scope.selectMandator = function () {
                MandatorSelectionService.selectMandator($scope.mandator,
                                 function () {
                                         LoginContextService.getLoginContext(function(loginContext) {
                                         LoginContextService.setLoginData(loginContext.User, loginContext.Mandator);
                                         console.log("mandator " + $scope.mandator.Name + " selected.");
                                         $location.path('/main');
                                     }, function(error){}
                                     )},
                                 function (error) {
                                     console.log("error @ mandator selection.");
                                     console.log(error);
                                 }
                             );
            };

            $scope.showMandatorSelection = function() {
                    var show = false;
                    if ($scope.mandators != null) {
                        show = true;
                    }
                    return show;
            };

            $scope.openLoginErrorAlert = function(message) {
                $scope.showProgress = false;
                MessageAlertCtrl.$inject = ['$scope', '$modalInstance', 'title', 'message'];
                var modalInstance = $modal.open({
                    templateUrl: 'views/alerts/errorAlert.html',
                    controller: MessageAlertCtrl,
                    keyboard: true,
                    resolve: {
                      title: function () {
                        return "Login fehlgeschlagen";
                      },
                      message: function() {
                        return message;
                      }
                    }
                });
          };
}]);
