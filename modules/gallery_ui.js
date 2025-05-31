"use strict";
import index from "../js/index.js";

import { API_BASE } from "./config.js";

function display_galerie(galerie) {
  const container = document.querySelector("#la_galerie");
  container.innerHTML = "";

  index.setCurrentGallery(galerie.photos);

  galerie.photos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("vignette");

    const id = p.photo.id;
    const titre = p.photo.titre;
    const thumbnailUrl = API_BASE + p.photo.thumbnail.href;

    div.dataset.photoId = id;

    div.innerHTML = `
        <img src="${thumbnailUrl}" alt="${titre}" />
        <p>${titre}</p>
    `;

    div.addEventListener("click", () => {
      index.openLightbox(id);
      index.getPicture(id);
    });

    container.appendChild(div);
  });
}

export default {
  display_galerie: display_galerie,
};
