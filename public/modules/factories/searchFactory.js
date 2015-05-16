//
// SEARCH FACTORY
// -----------------------------------

(function() {

  var searchFactory = function($http, $log) {

    return {

      checkVersion: function(url, callback) {

        // Hit the backend route to initiate phantomJS.
        $http.get('/siteinfo/' + encodeURIComponent(url))
          .success(function (data) {
            $log.log(data);
            callback(null, data);
          })
          .error(function (error) {
            callback(error);
          })

      }

    }

  };

  searchFactory.$inject = ['$http', '$log'];
  angular.module('jqueryCheckApp').factory('searchFactory', searchFactory);

})();