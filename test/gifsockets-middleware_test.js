var http = require('http');
var rawBody = require('raw-body');
var serverUtils = require('./utils/server');
var GifsocketsMiddleware = require('../');

describe('A server using gifsockets-middleware', function () {
  serverUtils.runPixelServer();
  before(function startGifsocketsMiddleware (done) {
    // Create a set of middlewares and server
    var middlewares = GifsocketsMiddleware({width: 200, height: 200});
    var app = http.createServer(function (req, res) {
      // DEV: We are intentionally not using express to very it works at any level
      if (req.method === 'GET') {
        middlewares.openImage(req, res);
      } else if (req.method === 'DELETE') {
        middlewares.closeOpenImages(req, res);
      } else {
        // Parse the body
        rawBody(req, function (err, buff) {
          if (err) {
            throw err;
          }

          // Save the buffer to the request
          req.body = buff;

          // Forward the request appropriately
          if (req.method === 'POST') {
            middlewares.writePixelsToImages(req, res);
          // DEV: This is a catch-all case but iddealy PUT
          } else {
            middlewares.writeTextToImages(req, res);
          }
        });
      }
    });
    app.listen(8050);

    // Save the app for later
    this.app = app;
    setTimeout(done, 100);
  });
  after(function stopGifsocketsMiddelware (done) {
    this.app.close(done);
  });

  it('', function () {

  });
});
