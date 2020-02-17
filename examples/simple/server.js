const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default

const nextI18next = require('./i18n')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  await nextI18next.initPromise
  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req, res, next) => {
    console.log(' [ ', 'Server'.red, ' ] ', req.url);
    if ((req.url || '').startsWith('/_next/webpack-hmr?page')) {
      const keyWord = '/_next/webpack-hmr?page=';
      // req.url.lastIndexOf(keyWord) +
      const route = req.url.slice(keyWord.length);
      console.log(' [ ', 'Server'.red, ' ] ', ' URL: ', route);
    }
    next();
  });
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
