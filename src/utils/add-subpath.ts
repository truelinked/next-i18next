export const addSubpath = (url: string, subpath: string) =>
    url.concat(`/${subpath}/`)
        .replace(/(https?:\/\/)|(\/)+/g, "$1$2")
        .replace(/\/$/, '')