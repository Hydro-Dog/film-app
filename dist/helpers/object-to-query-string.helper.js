"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToQueryString = void 0;
const objectToQueryString = (obj) => Object.entries(obj)
    .map(([key, val]) => `&${key}=${val}`)
    .join('');
exports.objectToQueryString = objectToQueryString;
//# sourceMappingURL=object-to-query-string.helper.js.map