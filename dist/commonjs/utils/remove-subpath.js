"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSubpath = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.constructor");

var _url = require("url");

var removeSubpath = function removeSubpath(url, subpath) {
  var parsedURL = (0, _url.parse)(url);
  var regExp = new RegExp("(\/" + subpath + ")(\/)?$", "igm");
  var fixedPathname = parsedURL.pathname.replace(regExp, "$2");

  if (fixedPathname.length === 0) {
    fixedPathname = '/';
  }

  var fixedURL = (0, _objectSpread2["default"])({}, parsedURL, {
    pathname: fixedPathname
  });
  return (0, _url.format)(fixedURL);
};

exports.removeSubpath = removeSubpath;