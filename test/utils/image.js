var fs = require('fs');
var getPixels = require('get-pixels');

exports.loadRgbaImage = function (filename) {
  before(function loadImage (done) {
    var that = this;
    getPixels(__dirname + '/../test-files/' + filename, function (err, pixels) {
      if (err) {
        return done(err);
      }
      that.rgbaPixels = pixels.data;
      done();
    });
  });
};

exports.debug = function (filename) {
  if (process.env.DEBUG_TEST) {
    before(function saveDebugImage () {
      console.log('writing', filename);
      try { fs.mkdirSync(__dirname + '/../actual-files/'); } catch (e) {}
      fs.writeFileSync(__dirname + '/../actual-files/' + filename, this.streamData, 'binary');
    });
  }
};