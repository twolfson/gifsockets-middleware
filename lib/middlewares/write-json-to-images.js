var TextCanvas = require('../../lib/text-canvas');

module.exports = function writeJsonToImagesMiddleware (gifsocket) {
  return function writeJsonToImages (req, res, next) {
    // By default, try to find rgbPixels
    var pixelJson = req.rgbPixels;
    var method = 'writeRgbFrame';

    // Fallback to rgbaPixels
    if (!pixelJson) {
      pixelJson = req.rgbaPixels || req.body;
      method = req.drawMethod || 'writeRgbaFrame';
    }

    // If there were no pixelJson, callback
    if (!pixelJson) {
      return next();
    }

    var pixels;
    try {
      pixels = JSON.parse(pixelJson);
    } catch (e) {
      return next(new Error('JSON could not be parsed'));
    }

    // Draw the pixels using the implied method
    gifsocket[method](pixels, function wroteJsonFrame () {
      // Send a no content response
      res.writeHead(204);
      res.end();
    });
  };
};