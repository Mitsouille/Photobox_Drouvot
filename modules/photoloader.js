"use strict";

import { API_BASE_URL, API_PHOTO, API_BASE } from "./config.js";

function loadPicture(idPicture) {
  return fetch(API_BASE_URL + API_PHOTO(idPicture), { credentials: "include" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Failed to load picture:", error);
      throw error;
    });
}

function loadResource(uri) {
  return fetch(API_BASE + uri, { credentials: "include" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Failed to load resource:", error);
      throw error;
    });
}

export default {
  loadPicture: loadPicture,
  loadResource: loadResource,
};
