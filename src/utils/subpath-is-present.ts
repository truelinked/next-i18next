import { parse as parseUrl } from 'url'

export const subpathIsPresent = (url: string, subpath: string) => {
  if (typeof url !== 'string' || typeof subpath !== 'string') {
    return false
  }

  const { pathname } = parseUrl(url);
  const indexOfQueryParams = pathname.lastIndexOf('?');
  let urlWithOutQueryParams = '';

  if (indexOfQueryParams !== -1) {
      urlWithOutQueryParams = pathname.substr(0, indexOfQueryParams);
  }

  const isPresent = typeof pathname === 'string' && (
      (pathname.length === subpath.length + 1 && pathname === `/${subpath}`) ||
      pathname.endsWith(`/${subpath}`) ||
      urlWithOutQueryParams.endsWith(`/${subpath}`)
  );


    return isPresent;
}
