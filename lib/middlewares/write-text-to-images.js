var TextCanvas = require('../../lib/text-canvas');

module.exports = function writTextToImagesMiddleware (gifsocket) {
  return function writTextToImages (req, res, next) {
    // Get our content to encode
    var text = req.text || req.body;

    // If there is no text, callback
    if (!text) {
      return next();
    }

    // Generate a new GIF to encode
    var textCanvas = new TextCanvas();
    textCanvas.getTextFrameData(query, function receiveTextFrameData (err, rawData) {
      if (err) {
        return next(err);
      }

      var rgbPixels = textCanvas.decodeStringImage(rawData);
      gifsocket.writeRgbFrame(rgbPixels, function wroteTextFrame () {
        // Send a no content response
        res.writeHead(204);
        res.end();
      });
    });
  };
};