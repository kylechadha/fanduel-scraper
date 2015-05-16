//
// ANGULAR ROUTES
// -----------------------------------

(function() {

  angular.module('jqueryCheckApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/search.html',
          controller: 'SearchController'
        })
        .otherwise( { redirectTo: '/' } );

      $locationProvider.html5Mode(true);

    }]);

}());
