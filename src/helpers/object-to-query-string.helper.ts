export const objectToQueryString = (obj: unknown) =>
  Object.entries(obj)
    .map(([key, val]) => `&${key}=${val}`)
    .join('')
