import { format, parse } from 'url';
export const addSubpath = (url, subpath) => {
  const parsedURL = parse(url);
  const formattedURL = format({ ...parsedURL,
    pathname: parsedURL.pathname.concat(`/${subpath}`)
  });
  return formattedURL.replace(/(https?:\/\/)|(\/)+/g, "$1$2").replace(/\/$/, '');
};