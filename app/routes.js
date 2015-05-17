var fs = require('fs');
var nightmareService = require('./services/nightmareService')

//
// ROUTES
// -----------------------------------

module.exports = function(app) {

  // Server Routes
  // ----------------------------------------------
  app.get('/scrape', function(req, res) {

    // Use the Nightmare Service to create a new game and get the url.
    nightmareService(function(error, data) {
      if (error) {
        res.send(error);
      }

      // Write the file to 'url.json'.
      fs.writeFile('url.json', JSON.stringify(data, null, 4), function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log('JSON file successfully created.')
        }
      });

      res.json(data);
    });

  });

  app.get('/url', function(req, res) {

    // Read the file and pull out the url data.
    fs.readFile('url.json', 'utf8', function(error, data) {
      if (error) {
        console.log(error);
      } else {
        // Send back the parsed data.
        var parsedData = JSON.parse(data);
        res.json(parsedData);
      }
    });
  })

};
