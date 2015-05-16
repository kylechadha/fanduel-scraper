//
// SEARCH CONTROLLER
// -----------------------------------

(function() {

  var SearchController = function($scope, $log, searchFactory) {

    $scope.siteURL = 'http://';
    $scope.validURL = false;
    $scope.showSpinner = false;
    $scope.siteResults = [];

    // Validate the url string, requiring either http or https.
    $scope.validateURL = function() {
      if (!$scope.siteURL.match(/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
        $scope.validURL = false;
        $scope.statusMessage = '';
      }
      else {
        $scope.validURL = true;
        $scope.errorMessage = '';
      }
    }

    $scope.getSiteInfo = function() {

      // Confirm that the url exists and is valid
      if ($scope.siteURL && $scope.validURL) {

        // Show the spinner and statusMessage.
        $scope.showSpinner = true;
        $scope.statusMessage = 'Give us a second while we give them a ring...';
        var currentURL = $scope.siteURL;

        // Use searchFactory to hit our backend route.
        searchFactory.checkVersion(currentURL, function(error, data) {

          // If there are no errors, update the statusMessage and add the url and version to the $scope.siteResults array.
          if (!error) {
            $scope.statusMessage = 'That was easy.';
            $scope.siteResults.push({
              url: currentURL,
              version: data.version
            });
          }

          $scope.showSpinner = false;

        });

      }
      // If the url does not exist or is invalid, display an error message.
      else {
        $scope.statusMessage = '';
        $scope.errorMessage = 'Whoops, that looks like an invalid URL.';
      }

    }

    // Delete the requested site from the $scope.siteResults array.
    $scope.deleteSite = function(site) {
      $scope.siteResults.splice($scope.siteResults.indexOf(site), 1);
    }

  };

  SearchController.$inject = ['$scope', '$log', 'searchFactory'];
  angular.module('jqueryCheckApp').controller('SearchController', SearchController);

}());
