# angular-woozle - an AngularJS for Woozle

Woozle is a .NET business application framework (https://github.com/fingersteps/woozle). Woozle provides a set of HTTP REST Services (e.g. Authentication, Navigation, etc.). The AngularJS module angular-woozle contains a set of services to connect the HTTP REST Services of woozle. 

## Installation

```
bower install https://github.com/fingersteps/angular-woozle.git
```

## Usage

```javascript

// Your app.js
angular
  .module('YourModule', [
    'woozle'
  ]);
  
// Use the services in your controller
angular.module('YourModule')
    .controller('YourController',  ['$scope', 'WoozleLoginContextService', 'WoozleNavigationService',
        function ($scope, LoginContextService, NavigationService) { });

```
