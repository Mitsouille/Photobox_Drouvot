"use strict";

export const API_BASE_URL =
  "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
export const API_BASE = "https://webetu.iutnc.univ-lorraine.fr";
// Export helper functions to build endpoints
export const API_PHOTO_PAGE = (page = 1, size = 10) =>
  `/www/canals5/phox/api/photos/?page=${page}&size=${size}`;

export const API_PHOTO = (id) => `/photos/${id}`;

export const API_COMMENT = (id) => `/photos/${id}/comments`;
