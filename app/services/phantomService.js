var phantom = require('phantom');

//
// PHANTOM SERVICE
// -----------------------------------

module.exports = function(url, callback) {

  // Initiate Phantom and set '--ssl-protocol=tlsv1' to switch from SSLv3 to TLSv1.
  // Note: SSLv3 is disabled on many servers due to the POODLE vulnerability. More Info: http://stackoverflow.com/questions/12021578/phantomjs-failing-to-open-https-site/26417660#26417660
  phantom.create('--ssl-protocol=tlsv1', function (ph) {
    ph.createPage(function(page) {
      page.open(url, function(status) {

        if (status === "fail") {
          data = {
            version: 'Whoops, are you sure this domain exists?'
          }
          
          callback(null, data);
          return ph.exit();
        }
        else if (status === "success") {

          // Evaluate the following function in the context of the page being opened.
          page.evaluate(function() {
            var jQueryVersion;

            // Determine if jQuery is defined. If it is, evaluate the version number.
            if (typeof jQuery !== "undefined") {
              jQueryVersion = 'jQuery Version: ' + jQuery.fn.jquery;
            }
            else {
              jQueryVersion = 'jQuery is not used at this site';
            }

            // Return the jQueryVersion in an object.
            return {
              version: jQueryVersion
            };
          }, function(data) {
            callback(null, data);
            return ph.exit();
          });
        }
        else {
          callback('Phantom experienced an error.');
        }
        
      });
    });
  });

}
