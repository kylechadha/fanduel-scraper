var request = require('supertest')
var express = require('express');

var app     = express();
var routes  = require('../app/routes')(app);

//
// ROUTES SPEC
// -----------------------------------

describe('routes', function() {
  describe('GET /siteinfo/:url', function() {
    it ('should respond with json data', function(done) {

      var sampleURL = 'http://efsharp.com'

      request(app)
        .get('/siteinfo/' + encodeURIComponent(sampleURL))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);

    });
  });

  describe('GET /', function() {
    it ('should respond with a web page', function(done) {

      request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /text\/html/)
        .expect(200, done);

    });
  });
});
