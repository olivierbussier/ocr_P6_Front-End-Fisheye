export function PhotographerHeaderFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getDOM() {

        // Article creation
        const div = document.createElement( 'section' );
        div.setAttribute("class","photograph-header")
        div.innerHTML =
            `<div>
                <h1>${name}</h1>
                <h2 class="city">${city}, ${country}</h2>
                <p class="tagline">${tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <div>
                <img class="image" src="${picture}" alt="${name}"></img>
            </div>`
        return div
    }
    return { getDOM }
}