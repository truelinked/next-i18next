"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSubpath = void 0;

require("core-js/modules/es6.regexp.replace");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _url = require("url");

var addSubpath = function addSubpath(url, subpath) {
  var parsedURL = (0, _url.parse)(url);
  var formattedURL = (0, _url.format)((0, _objectSpread2["default"])({}, parsedURL, {
    pathname: parsedURL.pathname.concat("/".concat(subpath))
  }));
  return formattedURL.replace(/(https?:\/\/)|(\/)+/g, "$1$2").replace(/\/$/, '');
};

exports.addSubpath = addSubpath;