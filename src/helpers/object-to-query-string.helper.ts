export const objectToQueryString = (obj: Object) =>
  Object.entries(obj)
    .map(([key, val]) => `&${key}=${val}`)
    .join('')
