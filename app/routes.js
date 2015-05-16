var phantomService = require('./services/phantomService')

//
// ROUTES
// -----------------------------------

module.exports = function(app) {

  // Server Routes
  // ----------------------------------------------
  app.get('/siteinfo/:url', function(req, res) {

    var url = req.params.url;

    // Use the Phantom Service to evaluate and return the requested url's jQuery version.
    phantomService(url, function(error, data) {
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
