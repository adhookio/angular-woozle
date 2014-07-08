'use strict';

angular.module('woozle')
    .factory('WoozleLoginContextService', ['$rootScope', 'Restangular', '$location', function ($rootScope, Restangular, $location) {
		var loginContext = {};
		loginContext.loggedIn = false;
		loginContext.loginUser;
		loginContext.loginUser = null;
		loginContext.loginMandator = null;

	  	loginContext.isLoggedIn = function() {
		    return this.loggedIn;
		};

	  	loginContext.loggedInUser = function () {
	  	    return this.loginUser;
	  	};

	  	loginContext.loggedInMandator = function () {
	  	    return this.loginMandator;
	  	};

		loginContext.setLoginData = function(user, mandator) {
		console.log(user);
		  this.loggedIn = true;
		  this.loginUser = user;
		  this.loginMandator = mandator;
		  this.broadcastLoginContextChanged();
		};

	  	loginContext.logout = function() {
	  	  this.loggedIn = false;
	  	  Restangular.one('api/auth', 'logout').get();
		  this.broadcastLoginContextChanged();
		};

		loginContext.broadcastLoginContextChanged = function() {
		  console.log('broadcast');
		  $rootScope.$broadcast('loginContextChanged');
		};

		loginContext.refreshLoginContext = function() {
			var that = this;
			Restangular.one('api/backendLoginContext?format=json').get()
					.then(function(loginContext) {
							console.log("Received LoginContext");
							console.log(loginContext);
							//The user is already logged in
							that.setLoginData(loginContext.User, loginContext.Mandator); 
							$location.path("/");  
	                    },
	                    function(error) {
	                    	console.log("Could not get a valid loginContext -> Redirect to login page");
	                    	//The user needs to login
	                    	$location.path("/login");
	                    });
		};

		loginContext.getLoginContext = function (success, error) {
            return Restangular.one('api/backendLoginContext?format=json').get().then(success, error);
        };

		return loginContext;
    }]);