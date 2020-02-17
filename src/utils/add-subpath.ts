export const addSubpath = (url: string, subpath: string) => {
    const indexOfQueryParams = url.lastIndexOf('?');
    let result;

    if (indexOfQueryParams !== -1) {
        const queryParams = url.substr(indexOfQueryParams);
        const urlWithOutQueryParams = url.substr(0, indexOfQueryParams);
        result = `${urlWithOutQueryParams}/${subpath}${queryParams}`;
    } else {
        result = `${url}/${subpath}`;
    }

    return result
        .replace(/(https?:\/\/)|(\/)+/g, "$1$2")
        .replace(/\/$/, '')
}
