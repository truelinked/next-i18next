"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lngPathCorrector = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _url = require("url");

var _index = require("./index");

var parseAs = function parseAs(originalAs, href) {
  var asType = (0, _typeof2["default"])(originalAs);
  var as;

  if (asType === 'undefined') {
    as = (0, _url.format)(href, {
      unicode: true
    });
  } else if (asType === 'string') {
    as = originalAs;
  } else {
    throw new Error("'as' type must be 'string', but it is ".concat(asType));
  }

  return as;
};

var parseHref = function parseHref(originalHref) {
  var hrefType = (0, _typeof2["default"])(originalHref);
  var href;

  if (hrefType === 'string') {
    href = (0, _url.parse)(originalHref, true
    /* parseQueryString */
    );
  } else if (hrefType === 'object') {
    href = (0, _objectSpread2["default"])({}, originalHref);
    href.query = originalHref.query ? (0, _objectSpread2["default"])({}, originalHref.query) : {};
  } else {
    throw new Error("'href' type must be either 'string' or 'object', but it is ".concat(hrefType));
  }

  return href;
};

var lngPathCorrector = function lngPathCorrector(config, currentRoute, currentLanguage) {
  var allLanguages = config.allLanguages,
      localeSubpaths = config.localeSubpaths;
  var originalAs = currentRoute.as,
      originalHref = currentRoute.href;

  if (!allLanguages.includes(currentLanguage)) {
    throw new Error('Invalid configuration: Current language is not included in all languages array');
  }

  var href = parseHref(originalHref);
  var as = parseAs(originalAs, href);
  /*
    url.format prefers the 'url.search' string over
    the 'url.query' object, so remove the search
    string to ensure the query object is used.
  */

  delete href.search;
  /*
    Strip any/all subpaths from the `as` value
  */

  Object.values(localeSubpaths).forEach(function (subpath) {
    if ((0, _index.subpathIsPresent)(as, subpath)) {
      as = (0, _index.removeSubpath)(as, subpath);
    }
  });

  if ((0, _index.subpathIsRequired)(config, currentLanguage)) {
    var basePath = "".concat(href.protocol, "//").concat(href.host);
    var currentAs = as.replace(basePath, '');
    var parsedAs = (0, _url.parse)(currentAs);
    var subpath = (0, _index.subpathFromLng)(config, currentLanguage);
    var pathname = typeof parsedAs.pathname === "string" && parsedAs.pathname.length > 0 ? parsedAs.pathname.replace(/\/$/, '') : '/';
    var search = typeof parsedAs.search === "string" ? parsedAs.search : '';
    var hash = typeof parsedAs.hash === "string" ? parsedAs.hash : '';
    as = "".concat(pathname, "/").concat(subpath).concat(search).concat(hash);
    var query = href.query; // @TODO I have to change pathname due to the unfixed error https://github.com/isaachinman/next-i18next/issues/413

    if (!query.id && originalAs) {
      href.pathname = href.pathname.replace(/\/$/, '').concat("/[subpath]");
    }

    href.query.lng = currentLanguage;
    href.query.subpath = subpath;
  }

  return {
    as: as,
    href: href
  };
};

exports.lngPathCorrector = lngPathCorrector;