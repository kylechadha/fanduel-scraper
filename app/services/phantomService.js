var phantom = require('phantom');

//
// PHANTOM SERVICE
// -----------------------------------

module.exports = function(callback) {

  // Initiate Phantom and set '--ssl-protocol=tlsv1' to switch from SSLv3 to TLSv1.
  // Note: SSLv3 is disabled on many servers due to the POODLE vulnerability. More Info: http://stackoverflow.com/questions/12021578/phantomjs-failing-to-open-https-site/26417660#26417660
  phantom.create('--ssl-protocol=tlsv1', function (ph) {
    ph.createPage(function(page) {

      page.open("https://www.fanduel.com/p/login", function(status) {

          page.set('onConsoleMessage', function (msg) {
              console.log("Phantom Console: " + msg)
          })
          page.set('onResourceReceived', function (response) {
              if (response.stage !== "end") return;
              console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + response.url);
          });
          page.set('onResourceRequested', function (requestData, networkRequest) {
              console.log('Request (#' + requestData.id + '): ' + requestData.url);
          });
          page.set('onUrlChanged', function(url) {
              console.log('New URL: ' + targetUrl);
          });
          page.set('onLoadFinished', function (status) {
              console.log('Load Finished: ' + status);
          });
          page.set('onLoadStarted', function () {
              console.log('Load Started');
          });
          page.set('onNavigationRequested', function(url, type, willNavigate, main) {
              console.log('Trying to navigate to: ' + url);
          });

        if (status === "fail") {
          data = {
            version: 'Whoops, could not open FanDuel url.'
          }

          callback(null, data);
          return ph.exit();
        }
        else if (status === "success") {

          console.log('FanDuel url successfully opened.');

          // Evaluate the following function in the context of the page being opened.
          page.evaluate(function() {

            if (window._phantom) {
              // Patch since PhantomJS does not implement click() on HTMLElement. In some 
              // cases we need to execute the native click on an element. However, jQuery's 
              // $.fn.click() does not dispatch to the native function on <a> elements, so we
              // can't use it in our implementations: $el[0].click() to correctly dispatch.
              if (!HTMLElement.prototype.click) {
                HTMLElement.prototype.click = function() {
                  var ev = document.createEvent('MouseEvent');
                  ev.initMouseEvent(
                      'click',
                      /*bubble*/true, /*cancelable*/true,
                      window, null,
                      0, 0, 0, 0, /*coordinates*/
                      false, false, false, false, /*modifier keys*/
                      0/*button=left*/, null
                  );
                  this.dispatchEvent(ev);
                };
              }
            }

            $('input[type=email]').val("kyle.chadha@gmail.com")
            $('input[type=password]').val("fdscraper")
            $('input[type=submit]').click()
            var submit = $('input[type=submit]')[0];

            var click = function(el){
                var ev = document.createEvent("MouseEvent");
                ev.initMouseEvent(
                    "click",
                    true /* bubble */, true /* cancelable */,
                    window, null,
                    0, 0, 0, 0, /* coordinates */
                    false, false, false, false, /* modifier keys */
                    0 /*left*/, null
                );
                el.dispatchEvent(ev);
            }

            click(submit);

            // NOTE:
            // Here's where we stopped with this flow. We don't actually get to the next page,
            // Which means the title at the bottom returns the login page info, womp womp.

            // Select NBA.
            var sport = $('.sport-selector').find('#-spsel-nba')
            if (sport.length == 0) {
              return {
                "error": "No NBA games today."
              };
            } else {
              sport[0].click();
            }

            // Select Head to Head (it's default, but no harm in being thorough).
            $('.contest-type-selector-head-to-head').click()

            var title = $('title').text();

            return {
              url: title
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
