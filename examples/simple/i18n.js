/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default

const options = {
  browserLanguageDetection: true,
  defaultNS: 'translation',
  defaultLanguage: 'en',
  otherLanguages: ['de', 'es'],
  localePath: "public/static/locales",
  // localeSubpaths: localeSubpathVariations[localeSubpaths],
  localeSubpaths: {
    en: 'en',
    de: 'de',
    es: 'es'
  },
  keySeparator: "/", // to allow use keyes from oneSky like "some.some1.name"
};

module.exports = new NextI18Next(options);

