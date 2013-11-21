# gifsockets-middleware [![Build status](https://travis-ci.org/twolfson/gifsockets-middleware.png?branch=master)](https://travis-ci.org/twolfson/gifsockets-middleware)

Set of HTTP middlewares for [gifsockets][]

This is part of the [gifsockets project][]; it acts as a plug and play middleware that is used in the [demo][gifsockets project] but can be re-used anywhere.

[gifsockets]: https://github.com/twolfson/gifsockets
[gifsockets project]: https://github.com/twolfson/gifsockets-server

## Getting Started
Install the module with: `npm install gifsockets-middleware`

```javascript
var GifsocketMiddleware = require('gifsockets-middleware');
var middlewares = GifsocketMiddleware({width: 200, height: 200});
var express = require('express');
var app = express();

// middlewares returns an object containing 4 middlewares
// `openImage` writes the beginning of a .gif and leaves `res` open
app.get('/image.gif', middlewares.openImage);

// `writePixelsToImages` writes a new frame to all open `res` from openImage
var bodyParser = express.bodyParser();
app.post('/image/pixels', bodyParser, middlewares.writePixelsToImages);

// `writeTextToImages` accepts a string of text and writes a new frame
// This requires running `phantomjs-pixel-server`
app.post('/image/text', bodyParser, middlewares.writeTextToImages);

// `closeOpenImages` closes all active images opened by `openImage`
app.post('/image/close', middlewares.closeOpenImages);

// If you want to load a specific middleware, you can do so
var openImageMiddleware = require('gifsockets-middleware/lib/middlewares/open-image');
var openImage = openImageMiddleware(gifsocket);
// `openImage` has the same behavior as that returned from `GifsocketMiddleware`
```

## Documentation
`gifsockets-middleware` returns `GifsocketMiddleware` as its `module.exports`

### `GifsocketMiddleware(options)`
Function that generates an object of middlewares for `gifsockets`

- options `Object`
    - width `Number` Width of the output GIF/`gifsocket`
    - height `Number` Height of the output GIF/`gifsocket`
- Returns an object containing
    - `openImage` middleware
    - `writePixelsToImages` middleware
    - `writeTextToImages` middleware
    - `closeOpenImages` middleware

### `openImage` middleware
Middleware that will maintain an open connection such that it can write additional GIF frames.

Function signature is `function (req, res, next) {}`

This does not expect any information on `req`/`res` and will not callback to `next`.

### `writePixelsToImages` middleware
Middleware that will write a new GIF frame with the provided pixels.

Function signature is `function (req, res, next) {}`

If `req.rgbPixels` exists, we will draw a GIF frame with the pixel values.

> `req.rgbPixels` is expected to be an stringified array of rgb pixels; `[0, 1, 2, 3, 4, 5]` is 2 pixels with `r: 0, g: 1, b: 2` and `r: 3, g: 4, b: 5`

If `req.rgbPixels` is not found, we look for `req.rgbaPixels` or `req.body`. If either of these is found, we will draw a GIF frame with the pixel values.

> `req.rgbaPixels`/`req.body` is expected to be an stringified array of rgba pixels; `[0, 1, 2, 3, 4, 5, 6, 7]` is 2 pixels with `r: 0, g: 1, b: 2, a: 3` and `r: 4, g: 5, b: 6, a: 7`

### `writeTextToImages` middleware

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Nov 20 2013, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
