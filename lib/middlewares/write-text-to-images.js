var qs = require('querystring');
var TextCanvas = require('../text-canvas');

module.exports = function writTextToImagesMiddleware (gifsocket) {
  return function writTextToImages (req, res, next) {
    // Get our content to encode
    var body = req.body;

    // If there is no body, callback
    if (!body) {
      return next();
    }

    // Generate a new GIF to encode
    var query = qs.parse(body.toString());
    var textCanvas = new TextCanvas(gifsocket);
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