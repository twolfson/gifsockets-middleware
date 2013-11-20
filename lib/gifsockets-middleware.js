var Gifsocket = require('gifsockets');
var openImageMiddleware = require('./middlewares/openImage');

function GifsocketsMiddleware(options) {
  // Create a new gifsocket for the middleware
  var gifsocket = new Gifsocket({
    width: options.width,
    height: options.height
  });

  // Return a set of middlewares for the image
  return {
    openImage: openImageMiddleware(gifsocket)
  };
}

module.exports = GifsocketsMiddleware;