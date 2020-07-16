import { format as formatUrl, parse as parseUrl } from 'url'

import { Config } from '../../types'
import {
  removeSubpath,
  subpathIsPresent,
  subpathIsRequired,
  subpathFromLng,
} from './index'
import { stringify } from 'query-string';

const parseAs = (originalAs, href) => {
  const asType = typeof originalAs
  let as

  if (asType === 'undefined') {
    as = formatUrl(href, { unicode: true })
  } else if (asType === 'string') {
    as = originalAs
  } else {
    throw new Error(`'as' type must be 'string', but it is ${asType}`)
  }

  return as
}

const parseHref = (originalHref) => {
  const hrefType = typeof originalHref
  let href

  if (hrefType === 'string') {
    href = parseUrl(originalHref, true /* parseQueryString */)
  } else if (hrefType === 'object') {
    href = { ...originalHref }
    href.query = originalHref.query ? { ...originalHref.query } : {}
  } else {
    throw new Error(`'href' type must be either 'string' or 'object', but it is ${hrefType}`)
  }

  return href
}
const getHref = (pathname, href, queryLength) => {
  if (typeof href.href === 'string') {
    const pathList = href.href.split('/')
    const asList = pathname.split('/')
    const regex = /\[(.*?)\]/gm
    const obj = {}
    for (let i = 0; i < pathList.length; i++) {
      const match = regex.exec(pathList[i])
      if (match !== null) {
        const key = match[1]
        const val = asList[i]
        obj[key] = val
        href.query[key] = val
        regex.lastIndex = 0
      }
    }
    const str = queryLength > 0 ? '&' : '?'
   return `${href.href}${str}${stringify(obj)}`
  } else {
   return href
  }
}

export const lngPathCorrector = (config: Config, currentRoute, currentLanguage) => {
  const { allLanguages, localeSubpaths } = config
  const { as: originalAs, href: originalHref } = currentRoute

  if (!allLanguages.includes(currentLanguage)) {
    throw new Error('Invalid configuration: Current language is not included in all languages array')
  }

  let href = parseHref(originalHref)
  let as = parseAs(originalAs, href)

  /*
    url.format prefers the 'url.search' string over
    the 'url.query' object, so remove the search
    string to ensure the query object is used.
  */
  delete href.search

  /*
    Strip any/all subpaths from the `as` value
  */
  Object.values(localeSubpaths).forEach((subpath: string) => {
    if (subpathIsPresent(as, subpath)) {
      as = removeSubpath(as, subpath)
    }
  })

  if (subpathIsRequired(config, currentLanguage)) {
    const basePath = `${href.protocol}//${href.host}`
    const currentAs = as.replace(basePath, '')
    const parsedAs = parseUrl(currentAs)
    const subpath = subpathFromLng(config, currentLanguage)
    const pathname = typeof parsedAs.pathname === "string" && parsedAs.pathname.length > 0 ? parsedAs.pathname.replace(/\/$/, '') : '/'
    const search = typeof parsedAs.search === "string" ? parsedAs.search : ''
    const hash = typeof parsedAs.hash === "string"  ? parsedAs.hash : ''

    as = `${pathname}/${subpath}${search}${hash}`
    // @TODO I have to change pathname due to the unfixed error https://github.com/isaachinman/next-i18next/issues/413
    const query = href.query
    const queryLength = Object.keys(query).length
    if (originalAs) {
      const newHref = getHref(pathname, href, queryLength)
      href.href = newHref
    }
    href.query.lng = currentLanguage
    href.query.subpath = subpath
  }

  return { as, href }
}
