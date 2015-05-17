var Nightmare = require('nightmare');

module.exports = function(callback) {

  var data;

  new Nightmare()
    .goto('https://www.fanduel.com/p/login')
      .type('input[type=email]', 'kyle.chadha@gmail.com')
      .type('input[type=password]', 'fdscraper')
      .click('input[type=submit]')
      .wait()
      .click('.create-contest')
      .wait()
      .visible('label[for="-spsel-nba"]', function(visible) {
      	if (!visible) {
          data = {
          	"error": "No NBA games today."
          }
          callback(null, data);
      	}
      })
      .click('#-spsel-nba')
      .click('.contest-type-selector-head-to-head')
      .check('input[type="checkbox"][value="1"]')
      .click('.select-team')
      .wait()
      .url(function(url) {
        if (!data) {
          data = {
            "url": url
          }
          callback(null, data);
        }
      })
      .run()

      // .screenshot("/Users/kylechadha/Projects/fanduel-scraper/screenshot.jpg") // use this to debug
}
