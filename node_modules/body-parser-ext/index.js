'use strict';

var bodyParser = require('body-parser');
var VError = require('verror');

var jsonDescriptor = Object.getOwnPropertyDescriptor(bodyParser, 'json');
if (!jsonDescriptor || !jsonDescriptor.get) {
  throw new Error('can not find json method');
}
var jsonGetter = jsonDescriptor.get;
delete bodyParser.json;

bodyParser.json = function json(options) {
  return [jsonGetter()(options), jsonParseErrorHandler];
};

var ERR_BODY_PARSE_JSON = 'BodyParseJsonError';
var ERR_PAYLOAD_TOO_LARGE = 'PayloadTooLargeError';
bodyParser.ERR_BODY_PARSE_JSON = ERR_BODY_PARSE_JSON;
bodyParser.ERR_PAYLOAD_TOO_LARGE = ERR_PAYLOAD_TOO_LARGE;

function jsonParseErrorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return next(
      new VError(
        {
          name: ERR_BODY_PARSE_JSON,
          cause: err
        },
        'Body parse JSON error'
      )
    );
  }

  if (err instanceof Error && err.type === 'entity.too.large') {
    return next(
      new VError(
        {
          name: ERR_PAYLOAD_TOO_LARGE,
          cause: err
        },
        'Payload too large error'
      )
    );
  }

  next(err);
}

module.exports = bodyParser;
