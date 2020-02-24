import { format, parse } from 'url';
export const removeSubpath = (url, subpath) => {
  const parsedURL = parse(url);
  const regExp = new RegExp("(\/" + subpath + ")(\/)?$", "igm");
  let fixedPathname = parsedURL.pathname.replace(regExp, "$2");

  if (fixedPathname.length === 0) {
    fixedPathname = '/';
  }

  const fixedURL = { ...parsedURL,
    pathname: fixedPathname
  };
  return format(fixedURL);
};