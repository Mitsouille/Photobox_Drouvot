import photoloader from "../modules/photoloader.js";
import ui from "../modules/ui.js";
import gallery_ui from "../modules/gallery_ui.js";
import gallery from "../modules/gallery.js";
import {
  API_BASE_URL,
  API_PHOTO,
  API_BASE,
  API_PHOTO_PAGE,
  API_COMMENT,
} from "../modules/config.js";

async function getPicture(idPicture) {
  const image = await photoloader.loadPicture(idPicture);
  const categorie = await getCategorie(image);
  const commentaire = await getCommentaire(image);

  image.commentaire = commentaire;
  ui.displayPicture(image);
  ui.displayCategorie(categorie);
}

async function getGalerie() {
  const galerie = await gallery.load(API_PHOTO_PAGE());

  gallery_ui.display_galerie(galerie);
}

function getCategorie(image) {
  const categorieURI = image.links.categorie.href;
  return photoloader.loadResource(categorieURI);
}

function getCommentaire(image) {
  const commentaireURI = image.links.comments.href;
  return photoloader.loadResource(commentaireURI);
}

document.querySelector("#galerie_button").addEventListener("click", () => {
  getGalerie();
});

document.querySelector("#next").addEventListener("click", () => {
  gallery.next().then((data) => {
    if (data) {
      gallery_ui.display_galerie(data);
    }
  });
});

document.querySelector("#prev").addEventListener("click", () => {
  gallery.prev().then((data) => {
    if (data) {
      gallery_ui.display_galerie(data);
    }
  });
});

let currentPhotoIndex = 0;
let currentGallery = [];

async function openLightbox(id) {
  const image = await photoloader.loadPicture(id);
  currentPhotoIndex = currentGallery.findIndex((p) => p.photo.id === id);

  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-caption");

  img.src = API_BASE + image.photo.url.href;
  console.log(image);
  img.alt = image.photo.titre;
  console.log(img.src);
  caption.textContent = image.photo.titre;

  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

async function showNextImage() {
  if (currentPhotoIndex < currentGallery.length - 1) {
    currentPhotoIndex++;
    await openLightbox(currentGallery[currentPhotoIndex].photo.id);
  }
}

async function showPrevImage() {
  if (currentPhotoIndex > 0) {
    currentPhotoIndex--;
    await openLightbox(currentGallery[currentPhotoIndex].photo.id);
  }
}

document
  .getElementById("lightbox-close")
  .addEventListener("click", closeLightbox);
document
  .getElementById("lightbox-next")
  .addEventListener("click", showNextImage);
document
  .getElementById("lightbox-prev")
  .addEventListener("click", showPrevImage);

function setCurrentGallery(gallery) {
  currentGallery = gallery;
}

function getCurrentGallery() {
  return currentGallery;
}

function setCurrentPhotoIndex(index) {
  currentPhotoIndex = index;
}

function getCurrentPhotoIndex() {
  return currentPhotoIndex;
}

document
  .querySelector("#form-commentaire")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const pseudo = document.getElementById("input-pseudo").value.trim();
    const titre = document.getElementById("input-titre").value.trim();
    const content = document.getElementById("input-content").value.trim();

    const id = getCurrentGallery()[getCurrentPhotoIndex()].photo.id;
   
    const url = `${API_BASE_URL}${API_COMMENT(id)}`;
    const commentaire = {
      titre,
      content,
      pseudo,
    };

    try {
        //Lors de mes tests en local j'ai une erreur 401 je ne sais pas pourquoi
      const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include',
            body: JSON.stringify(commentaire)
          });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du commentaire");
      }

      alert("Commentaire ajouté !");
      document.getElementById("form-commentaire").reset();

      // Recharge les commentaires
      const image = await photoloader.loadPicture(id);
      const commentaireData = await photoloader.loadResource(
        image.links.comments.href
      );
      ui.displayCategorie(
        await photoloader.loadResource(image.links.categorie.href)
      );
      ui.displayPicture({ ...image, commentaire: commentaireData });
    } catch (err) {
      console.error(err);
      alert("Impossible d'ajouter le commentaire.");
    }
  });

export default {
  getPicture: getPicture,
  openLightbox: openLightbox,
  getCurrentGallery: getCurrentGallery,
  setCurrentGallery: setCurrentGallery,
  getCurrentPhotoIndex: getCurrentPhotoIndex,
  setCurrentPhotoIndex: setCurrentPhotoIndex,
};
