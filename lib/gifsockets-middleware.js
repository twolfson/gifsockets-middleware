var Gifsocket = require('gifsockets');
var openImageMw = require('./middlewares/open-image');
var writeTextToImagesMw = require('./middlewares/write-text-to-images');
var writeJsonToImagesMw = require('./middlewares/write-json-to-images');
var closeOpenImagesMw = require('./middlewares/close-open-images');

function GifsocketsMiddleware(options) {
  // Create a new gifsocket for the middleware
  var gifsocket = new Gifsocket({
    width: options.width,
    height: options.height
  });

  // Return a set of middlewares for the image
  return {
    openImage: openImageMw(gifsocket),
    writeTextToImages: writeTextToImagesMw(gifsocket),
    writeJsonToImages: writeJsonToImagesMw(gifsocket),
    closeOpenImages: closeOpenImagesMw(gifsocket)
  };
}

module.exports = GifsocketsMiddleware;