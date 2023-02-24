/// <reference types="node" />

import {
  Options,
  OptionsJson,
  OptionsText,
  OptionsUrlencoded
} from 'body-parser';
import { NextHandleFunction, ErrorHandleFunction } from 'connect';

declare namespace bodyParser {
  const ERR_BODY_PARSE_JSON: string;
  const ERR_PAYLOAD_TOO_LARGE: string;

  function json(
    options?: OptionsJson
  ): [NextHandleFunction, ErrorHandleFunction];
  function raw(options?: Options): NextHandleFunction;
  function text(options?: OptionsText): NextHandleFunction;
  function urlencoded(options?: OptionsUrlencoded): NextHandleFunction;
}

export = bodyParser;
