module.exports = function closeOpenImagesMiddleware (gifsocket) {
  return function closeOpenImages (req, res) {
    // Close all connections via gifsocket
    gifsocket.closeAll(function allSocketsClosed () {
      res.send(204);
    });
  };
};