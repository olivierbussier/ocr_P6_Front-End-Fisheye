/**
 * Permet de créér le header spécifique d'un photographe dont les
 * données sont passées en paramètre
 *
 * @param {{name: string,id: number,city: string,country: string,tagline: string,price: number, portrait: string}[]} photographer
 * @param {{id: number, photographerId: number, title: string, image: string, likes: number, date: date, price: number}[]} medias
 * @returns {HTMLElement}
 */
 export function PhotographerSummaryFactory(photographer, medias) {
    const { id, price } = photographer;
    var cumulatatedLikes = 0

    // Count cumulated likes
    medias.forEach(element => {
        cumulatatedLikes += element.likes
    })

    // Summary creation
    const divSummary = document.createElement( 'div' );
    divSummary.setAttribute("class","photograph-summary")

    divSummary.innerHTML =
        `<div>
            <span class="cumul-likes">${cumulatatedLikes}</span>
            <img class="heart" src="assets/icons/heart-black.svg" alt="Total des likes pour le photographe">
         </div>
         <div>${price}€ / jour</div>`

    return divSummary
}