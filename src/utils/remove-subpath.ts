export const removeSubpath = (url: string, subpath: string) => {
  const result = url
      .replace(`/${subpath}`, '')
      .replace(/(https?:\/\/)|(\/)+/g, "$1$2");

    return result || '/';
};
