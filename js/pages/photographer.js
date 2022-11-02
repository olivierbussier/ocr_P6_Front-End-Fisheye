//Mettre le code JavaScript lié à la page photographer.html

import { setupEventModal } from "./contactForm.js"

import { PhotographerHeaderFactory } from "../factories/PhotographerHeaderFactory.js"
import { PhotographerGalleryFactory } from "../factories/PhotographerGalleryFactory.js"

import { LoadPhotographersData } from "../lib/LoadPhotographersData.js"
import { customListBox } from "../components/listbox.js"
import { PhotographerSummaryFactory } from "../factories/PhotographerSummaryFactory.js"

/**
 *
 * @param {{name: string,id: number,city: string,country: string,tagline: string,price: number, portrait: string}[]} photographer
 * @param {{id: number, photographerId: number, title: string, image: string, likes: number, date: date, price: number}[]} medias
 */
function display(photographer, medias) {

    const headerInfo  = document.querySelector(".photograph-info")
    const headerImage = document.querySelector(".photograph-image")
    const divMain     = document.querySelector("#main")
    const divSearch   = document.querySelector(".photograph-sort")
    const summary     = document.getElementById("summary")

    // Ajout du header
    const {divInfo, divImage } = PhotographerHeaderFactory(photographer)
    headerInfo.appendChild(divInfo)
    headerImage.appendChild(divImage)

    // Ajout de la liste de choix de tri

    const sortList = new customListBox([
        {sort: 'Titre', method: 'titre'},
        {sort: 'Popularité', method: 'popularite'},
        {sort: 'Date', method: 'date'}
    ], 'titre')
    divSearch.appendChild(sortList.getCustomElement())

    sortList.setHook(hookSort)

    /**
     * Fonction de tri
     *
     * @param {string} sortMode
     */
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

    /**
     * Fonction de gestion du tri des médias,
     * déclenchée par un click dans a liste de choix
     *
     * @param {string} sortMode
     */
    function hookSort(sortMode) {
        mediaSort(sortMode)
        const oldGallery = document.querySelector(".photograph-gallery")
        divMain.removeChild(oldGallery)
        const gallery = new PhotographerGalleryFactory(photographer.name, medias).getDOM()
        displaycumulatedLikes()
        divMain.appendChild(gallery)
        setHookIncrementLikes()
    }

    function displaycumulatedLikes() {
        const child       = summary.querySelector('.photograph-summary')
        // Mise à jour de la boite summary
        if (child)
            summary.removeChild(child)

        // Calcul du cumul du nombre de likes
        summary.appendChild(PhotographerSummaryFactory(photographer, medias))

    }

    function setHookIncrementLikes() {
        document.querySelectorAll("img.increment-likes").forEach((element) => {
            element.addEventListener("click", (element) => {
                const id = element.target.getAttribute('data-id')
                medias.forEach((media) => {
                    if (media.id === parseInt(id)) {
                        media.likes++
                        // Update du compteur de likes
                        const span = element.target.previousElementSibling
                        span.innerText = media.likes
                        displaycumulatedLikes()
                    }
                })
            })
        })
    }
    // Affichage des images de la gallerie triées
    const gallery = new PhotographerGalleryFactory(photographer.name, medias).getDOM()
    divMain.appendChild(gallery)

    function setHookAffFullImage() {
        medias.forEach((media) => {

        })
    }
    displaycumulatedLikes()
    setHookIncrementLikes()

    // Mise en place des hooks pour incrémenter les likes


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

    // Redirection vers la page d'accueil si le photographe n'existe pas
    if (!id || !photographer) {
        window.location.href = "index.html";
    }
    const gallery = data.getPhotographersMedia(id)

    display(photographer, gallery)

    // Mise en place des hooks pour les fenêtres modal

    setupEventModal()
}

init();
