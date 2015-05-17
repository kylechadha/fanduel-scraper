var Nightmare = require('nightmare');

module.exports = function(callback) {

  new Nightmare()
    .goto('https://www.fanduel.com/p/login')
      .type('input[type=email]', 'kyle.chadha@gmail.com')
      .type('input[type=password]', 'fdscraper')
      .click('input[type=submit]')
      .wait()
      .click('.create-contest')
      .wait()
      .click('#-spsel-nhl')
      .click('.contest-type-selector-head-to-head')
      .click('input[type="checkbox"][value="1"]')
      .click('.select-team')
      .wait()
      .screenshot("/Users/kylechadha/test.jpg")
      .evaluate(function() {
        return "box";
      }, function (data) {
        console.log(data);
        callback(null, data);
      })
      .run()

}
