"use strict";

function displayPicture(image) {
  const templatePhoto = document.querySelector("#template-photo").innerHTML;
  const template = Handlebars.compile(templatePhoto);
  document.querySelector("section#la_photo").innerHTML = template(image);
}

function displayCategorie(categorie) {
  const categorieElement = document.querySelector("#categorie");
  categorieElement.textContent = `catégorie : ${categorie.categorie.nom}`;
}

export default {
  displayPicture: displayPicture,
  displayCategorie: displayCategorie,
};
