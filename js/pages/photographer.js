//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerHeaderFactory } from "../factories/PhotographerHeaderFactory.js"
import { PhotographerGalleryFactory } from "../factories/PhotographerGalleryFactory.js"
import { SortListFactory } from "../factories/SortListFactory.js"

import { LoadPhotographersData } from "../lib/LoadPhotographersData.js"

/**
 * affichage
 */
 function displayHeader(photographer, medias) {

    const headerSection = document.querySelector("main")

    // Ajout du header
    const headerPhotograph = PhotographerHeaderFactory(photographer)
    const headerPhotographDOM = headerPhotograph.getDOM()
    headerSection.appendChild(headerPhotographDOM)

    // Ajout de la liste de choix de tri
    const sortList = new SortListFactory().getDOM()
    headerSection.appendChild(sortList)

    // Ajout des images
    const gallery = new PhotographerGalleryFactory(photographer.name, medias).getDOM()
    headerSection.appendChild(gallery)
}

// function displayMedias(photographer) {

//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// };

async function init() {

    // Recherche de l'id du photographe a afficher
    const params = (new URL(document.location)).searchParams;
    const stringId = params.get('id')
    const id = stringId === null ? 0 : parseInt(stringId)

    // Récupère les datas du photographe
    const data = new LoadPhotographersData('../data/photographers.json')
    await data.fetchData()
    const photographer = data.getPhotographersCards(id)
    const gallery = data.getPhotographersMedia(id)

    displayHeader(photographer, gallery)
}

init();
