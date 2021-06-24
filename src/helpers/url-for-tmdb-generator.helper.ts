import { FilmCategories } from 'src/film/film.models'

export const getAPIReqCategoryUrl = (
  apiBaseUrl: string,
  apiKey: string,
  filmCategory: FilmCategories,
  page: number,
  lang: string
) =>
  `${apiBaseUrl}/movie/${filmCategory}?api_key=${apiKey}&page=${page}&language=${lang}`

export const getAPIDiscoverUrl = (
  apiBaseUrl: string,
  apiKey: string,
  filters: string,
  page: number,
  lang: string
) => {
  return `${apiBaseUrl}/discover/movie/?api_key=${apiKey}&page=${page}&language=${lang}${filters}`
}
