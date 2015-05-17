var nightmareService = require('./services/nightmareService')

//
// ROUTES
// -----------------------------------

module.exports = function(app) {

  // Server Routes
  // ----------------------------------------------
  app.get('/url', function(req, res) {

    // Use the Nightmare Service to create a new game and get the url.
    nightmareService(function(error, data) {
      if (error) {
        res.send(error);
      }

      res.json(data);
    });

  });
  
  // Index Route
  // ----------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });

};
