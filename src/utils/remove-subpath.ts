export const removeSubpath = (url: string, subpath: string) =>
  url
    .replace("/".concat(subpath), '')
    .replace(/(https?:\/\/)|(\/)+/g, "$1$2")