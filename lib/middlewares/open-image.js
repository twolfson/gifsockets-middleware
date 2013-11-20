module.exports = function openImageMiddleware (gifsocket) {
  return function openImage (req, res) {
    // Write out a header which will keep the connection open
    res.writeHead(200, {
      'connection': 'keep-alive',
      'content-type': 'image/gif',
      'transfer-encoding': 'chunked'
    });

    // Add a listener and write GIF header data
    gifsocket.addListener(res);
  };
};