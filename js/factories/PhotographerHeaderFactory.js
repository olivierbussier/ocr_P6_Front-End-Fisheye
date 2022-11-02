/**
 * Permet de créér le header spécifique d'un photographe dont les
 * données sont passées en paramètre
 *
 * @param {{ name:string, portrait:string, city:string, country:string, tagline:string }} photographerInfo
 * @returns {HTMLElement}
 */
export function PhotographerHeaderFactory(photographerInfo) {
    const { name, portrait, city, country, tagline } = photographerInfo;
    const picture = `assets/photographers/thumbs/${portrait}`;

    // Article creation
    const divInfo = document.createElement( 'div' );
    divInfo.innerHTML =
        `<h1>${name}</h1>
         <h2 class="city">${city}, ${country}</h2>
         <p class="tagline">${tagline}</p>`

    const divImage = document.createElement( 'div' );
    divImage.innerHTML =
         `<img class="image" src="${picture}" alt="${name}"></img>`
    return {divInfo, divImage}
}