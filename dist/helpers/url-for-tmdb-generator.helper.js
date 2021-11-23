"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAPIDiscoverUrl = exports.getAPIReqCategoryUrl = void 0;
const film_models_1 = require("../film/film.models");
const getAPIReqCategoryUrl = (apiBaseUrl, apiKey, filmCategory, page) => `${apiBaseUrl}/movie/${filmCategory}?api_key=${apiKey}&page=${page}`;
exports.getAPIReqCategoryUrl = getAPIReqCategoryUrl;
const getAPIDiscoverUrl = (apiBaseUrl, apiKey, filters, page, lang) => {
    return `${apiBaseUrl}/discover/movie/?api_key=${apiKey}&page=${page}&language=${lang}${filters}`;
};
exports.getAPIDiscoverUrl = getAPIDiscoverUrl;
//# sourceMappingURL=url-for-tmdb-generator.helper.js.map