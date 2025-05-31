"use strict";

import photoloader from "./photoloader.js";
import { API_PHOTO_PAGE } from "./config.js";

let photos = [];
let navLinks = {};
//Garder la page courante car si première page le prev == première page :/ l'API devrait proposer la dernière en cas de première,
//Ou laisser le lien vide car cela rend la fonctionnalité de boucler plus compliqué
let currentPage = API_PHOTO_PAGE();

function load(url = API_PHOTO_PAGE()) {
  currentPage = url;
  return photoloader.loadResource(url).then((data) => {
    photos = data.photos;
    navLinks = data.links;
    return data;
  });
}

function next() {
  if (navLinks.next) {
    if (currentPage === navLinks.last.href) {
      return load(navLinks.first.href);
    }
    return load(navLinks.next.href);
  }
  return Promise.resolve(null);
}

function prev() {
  if (navLinks.prev) {
    if (currentPage == navLinks.first.href) {
      return load(navLinks.last.href);
    }
    return load(navLinks.prev.href);
  }
  return Promise.resolve(null);
}

function first() {
  if (navLinks.first) {
    return load(navLinks.first.href);
  }
  return Promise.resolve(null);
}

function last() {
  if (navLinks.last) {
    return load(navLinks.last.href);
  }
  return Promise.resolve(null);
}

export default {
  load: load,
  next: next,
  prev: prev,
};
