# body-parser-ext

![npm](https://img.shields.io/npm/v/body-parser-ext.svg?style=flat-square)

An extended version of
[body-parser](https://www.npmjs.com/package/body-parser)
middleware with additional error handling using
[VEerror](https://www.npmjs.com/package/verror)

## Extended error handling

- ERR_BODY_PARSE_JSON
- ERR_PAYLOAD_TOO_LARGE

## Installation

```bash
npm i -S body-parser-ext
```

## Usage

As well as [body-parser](https://www.npmjs.com/package/body-parser)

## Javascript example

```javascript
'use strict';

const express = require('express');
const bodyParser = require('body-parser-ext');

const PORT = 3000;
const app = express();

// Parse application/json
app.use(bodyParser.json());

// Sample middleware
app.get('/', (req, res) => {
  res.status(200).json(req.body);
});

// Other middlewares

// The catch 404 error handler
app.use((_, res) => {
  res.status(404).end();
});

// The 'catch-all' error handler
app.use((err, _, res, __) => {
  // Bad request
  if (err.name === bodyParser.ERR_BODY_PARSE_JSON) {
    console.log(bodyParser.ERR_BODY_PARSE_JSON);
    return res.status(400).end();
  }

  // Payload too large
  if (err.name === bodyParser.ERR_PAYLOAD_TOO_LARGE) {
    console.log(bodyParser.ERR_PAYLOAD_TOO_LARGE);
    return res.status(413).end();
  }

  // Unexpected error
  console.log('unexpected error');
  res.status(500).end();
});

// Start server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
```

## Typescript example

```typescript
import express from 'express';
import bodyParser from 'body-parser-ext';

const PORT = 3000;
const app = express();

// Parse application/json
app.use(bodyParser.json());

// Sample middleware
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json(req.body);
});

// Other middlewares

// The catch 404 error handler
app.use((_: express.Request, res: express.Response) => {
  res.status(404).end();
});

// The 'catch-all' error handler
app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    __: express.NextFunction
  ) => {
    // Bad request
    if (err.name === bodyParser.ERR_BODY_PARSE_JSON) {
      console.log(bodyParser.ERR_BODY_PARSE_JSON);
      return res.status(400).end();
    }

    // Payload too large
    if (err.name === bodyParser.ERR_PAYLOAD_TOO_LARGE) {
      console.log(bodyParser.ERR_PAYLOAD_TOO_LARGE);
      return res.status(413).end();
    }

    // Unexpected error
    console.log('unexpected error');
    res.status(500).end();
  }
);

// Start server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
```

## License

[MIT](LICENSE)
