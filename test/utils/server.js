var spawn = require('child_process').spawn;
var pixelServerPath = require.resolve('phantomjs-pixel-server');

exports.runPixelServer = function () {
  before(function startPhantomPixelServer (done) {
    this._phantomServer = spawn('phantomjs', [pixelServerPath], {stdio: [0, 1, 2]});
    setTimeout(done, 1000);
  });
  after(function (done) {
    this._phantomServer.kill();
    this._phantomServer.on('exit', function (code, signal) {
      done();
    });
  });
};
