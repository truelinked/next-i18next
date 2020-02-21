export const addSubpath = (url, subpath) => url.concat(`/${subpath}/`).replace(/(https?:\/\/)|(\/)+/g, "$1$2").replace(/\/$/, '');