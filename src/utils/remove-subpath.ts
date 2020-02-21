import { format, parse } from 'url'

export const removeSubpath = (url: string, subpath: string) => {
  const parsedURL = parse(url)
  const regExp = new RegExp("(\/" + subpath + ")(\/)?$","igm")
  const fixedPathname = parsedURL.pathname.replace(regExp, "$2")
  const fixedURL = {...parsedURL, pathname: fixedPathname}
  return format(fixedURL)
}