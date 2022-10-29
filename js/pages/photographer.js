//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerHeaderFactory } from "../factories/PhotographerHeaderFactory.js"
import { PhotographerGalleryFactory } from "../factories/PhotographerGalleryFactory.js"

import { LoadPhotographersData } from "../lib/LoadPhotographersData.js"
import { customListBox } from "../components/listbox.js"

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
    const div = document.createElement( 'div' );
    div.setAttribute("class","photograph-sort")
    const p = document.createElement( 'p' );
    p.textContent = "Trier par : "
    div.appendChild(p)

    const sortList = new customListBox([
        {sort: 'Titre', method: 'titre'},
        {sort: 'Popularité', method: 'popularite'},
        {sort: 'Date', method: 'date'}
    ], 'titre')
    div.appendChild(sortList.getCustomElement())

    sortList.setHook(hookSort)

    function mediaSort(sortMode) {
        medias.sort((elem1, elem2) => {
            switch (sortMode) {
                case 'titre':      return elem1.title.localeCompare(elem2.title); break
                case 'popularite': return elem1.likes <= elem2.likes ? -1 : 1 ; break
                case 'date':       return new Date(elem1.date) <= new Date(elem2.date) ? -1 : 1 ; break
            }
        })
    }

    mediaSort('titre')

    headerSection.appendChild(div)
    function hookSort(sortMode) {
        mediaSort(sortMode)
        const oldGallery = document.querySelector(".photograph-gallery")
        headerSection.removeChild(oldGallery)
        const gallery = new PhotographerGalleryFactory(photographer.name, medias).getDOM()
        headerSection.appendChild(gallery)
    }
    // Ajout des images
    const gallery = new PhotographerGalleryFactory(photographer.name, medias).getDOM()
    headerSection.appendChild(gallery)
}

/**
 *
 */
  async function init() {

    // Recherche de l'id du photographe a afficher
    const params = (new URL(document.location)).searchParams;
    const stringId = params.get('id')
    const id = stringId === null ? 0 : parseInt(stringId)

    // Récupère les datas du photographe
    const data = new LoadPhotographersData('./data/photographers.json')
    await data.fetchData()
    const photographer = data.getPhotographersCards(id)
    const gallery = data.getPhotographersMedia(id)

    displayHeader(photographer, gallery)
}

init();
