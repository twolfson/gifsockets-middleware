var TextCanvas = require('../../lib/text-canvas');

module.exports = function writeJsonToImagesMiddleware (gifsocket) {
  return function writeJsonToImages (req, res, next) {
    // By default, try to find rgbPixels
    var pixels = req.rgbPixels;
    var method = 'writeRgbFrame';

    // Fallback to rgbaPixels
    if (!pixels) {
      pixels = req.rgbaPixels || req.body;
      method = req.drawMethod || 'writeRgbaFrame';
    }

    // If there were no pixels, callback
    if (!pixels) {
      return next();
    }

    // Draw the pixels using the implied method
    gifsocket[method](pixels, function wroteJsonFrame () {
      // Send a no content response
      res.writeHead(204);
      res.end();
    });
  };
};