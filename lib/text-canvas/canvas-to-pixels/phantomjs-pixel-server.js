var assert = require('assert');
var request = require('request');
function noop() {}

module.exports = function getImageInfo (params, cb) {
  assert(params.js, 'JS not provided');
  assert(params.width, 'Width not provided');
  assert(params.height, 'Height not provided');

  // TODO: Update params.js to function-to-string

  // Stringify our argument for phantomjs
  var arg = JSON.stringify(params),
      encodedArg = encodeURIComponent(arg);

  request({
    url: 'http://localhost:9090/',
    method: 'POST',
    headers: {
      // DEV: PhantomJS looks for Proper-Case headers, request is lower-case =(
      'Content-Length': encodedArg.length
    },
    body: encodedArg
  }, function handlePhantomResponse(err, res, body) {
    // If there was an error, callback with it
    if (err) {
      return cb(err);
    }

    // If there was a bad status code, callback with a good message
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return cb(new Error('PhantomJS server responded with "' + res.statusCode + '" status code. ' + body));
    }

    // Otherwise, callback with the body
    cb(null, body);
  });
};
