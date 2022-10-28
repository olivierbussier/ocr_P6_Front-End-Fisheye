import { PhotographerCardFactory } from "../factories/PhotographerCardFactory.js"
import { LoadPhotographersData } from "../lib/LoadPhotographersData.js"

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = PhotographerCardFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const data = new LoadPhotographersData('./data/photographers.json')
    await data.fetchData()
    displayData(data.getPhotographersCards());
};

init();
