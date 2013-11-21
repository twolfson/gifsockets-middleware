var http = require('http');
var rawBody = require('raw-body');
var request = require('request');
var imageUtils = require('./utils/image');
var serverUtils = require('./utils/server');
var GifsocketsMiddleware = require('../');

function openImage() {
  before(function (done) {
    var that = this;
    this.gifData = '';
    var req = request({
      url: 'http://localhost:8050/',
      encoding: 'binary'
    });
    req.on('error', function (err) {
      done(err);
    });
    req.on('response', function (res) {
      res.on('data', function (buff) {
        that.gifData += buff;
      });
      that.gifRes = res;
      done();
    });
  });
}

function closeImage() {
  before(function (done) {
    this.gifRes.on('end', done);
    request({
      url: 'http://localhost:8050/',
      method: 'DELETE'
    });
  });
}

describe('A server using gifsockets-middleware', function () {
  serverUtils.runPixelServer();
  before(function startGifsocketsMiddleware (done) {
    // Create a set of middlewares and server
    var middlewares = GifsocketsMiddleware({width: 10, height: 10});
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
            middlewares.writeJsonToImages(req, res);
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

  describe('receiving a request', function () {
    openImage();
    before(function saveGifData () {
      this._beforeFrameData = this.gifData;
    });
    before(function writeNewFrame (done) {
      this.timeout(5000);
      request({
        url: 'http://localhost:8050/image/text',
        method: 'POST',
        form: {
          text: 'Hello',
          'font-family': 'Arial',
          'font-size': '2'
        }
      }, done);
    });

    it('receives a new frame', function () {
      assert.notEqual(this._beforeFrameData, this.gifData);
    });

    describe('and closing the image', function () {
      closeImage();
      imageUtils.debug('text.gif');

      it('creates a GIF image', function () {
        // TODO: We might be able to use image magick for a fuzzy match
        var expectedImages = ['text.gif', 'text2.gif'];
        var matchedAnImage = false;
        var i = expectedImages.length;
        while (i--) {
          var expectedImg = fs.readFileSync(__dirname + '/expected-files/' + expectedImages[i], 'binary');
          if (expectedImg === this.gifData) {
            matchedAnImage = true;
            break;
          }
        }
        assert(matchedAnImage);
      });
    });
  });

  describe('writing a JSON pixel frame', function () {
    openImage();
    imageUtils.loadRgbaImage(__dirname + '/test-files/checkerboard.png');
    before(function writeJsonFrame (done) {
      request({
        url: 'http://localhost:8050/',
        method: 'POST',
        body: JSON.stringify([].slice.call(this.rgbaPixels))
      }, done);
    });
    closeImage();
    imageUtils.debug('json.gif');

    it('creates the image as a GIF', function () {
      var expectedImg = fs.readFileSync(__dirname + '/expected-files/json.gif', 'binary');
      assert.strictEqual(this.gifData, expectedImg);
    });
  });
});
