# gifsockets-middleware [![Build status](https://travis-ci.org/twolfson/gifsockets-middleware.png?branch=master)](https://travis-ci.org/twolfson/gifsockets-middleware)

Set of HTTP middlewares for gifsockets

## Getting Started
Install the module with: `npm install gifsockets-middleware`

```javascript
var GifsocketMiddleware = require('gifsockets-middleware');
var middlewares = GifsocketMiddleware({width: 200, height: 200});

// middlewares is an object with 4 specific middlewares
{
  openImage
  writePixelsToImages
  writeTextToImages
  closeOpenImages
}

// If you want to load a specific middleware, you can do so
var openImageMiddleware = require('gifsockets-middleware/lib/middlewares/open-image');
var openImage = openImageMiddleware(gifsocket);
// openImage has the same behavior as that returned from `GifsocketMiddleware`
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

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
