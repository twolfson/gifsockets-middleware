var GifsocketsMiddleware = require('../');

var middlewares = GifsocketMiddleware({width: 200, height: 200});
var http = require('http');

describe('A server using gifsockets-middleware', function () {
  before(function startGifsocketsMiddleware() {
    // TODO: Use very silly routing; make sure this can run in a non-express env
    // middlewares returns an object containing 4 middlewares
    // `openImage` writes the beginning of a .gif and leaves `res` open
    app.get('/image.gif', middlewares.openImage);

    // `writePixelsToImages` writes a new frame to all open `res` from openImage
    var bodyParser = express.bodyParser();
    app.post('/image/pixels', bodyParser, middlewares.writePixelsToImages);

    // `writeTextToImages` accepts a string of text and writes a new frame
    // This requires running `phantomjs-pixel-server`
    app.post('/image/text', bodyParser, middlewares.writeTextToImages);

    // `closeOpenImages` closes all active images opened by `openImage`
    app.post('/image/close', bodyParser, middlewares.closeOpenImages);
  }

  before(function () {

  });

  it('', function () {

  });
});
