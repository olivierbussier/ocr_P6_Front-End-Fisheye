export function PhotographerCardFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/thumbs/${portrait}`;

    function getUserCardDOM() {

        // Article creation
        const article = document.createElement( 'article' );
        article.innerHTML =
            `<a class="link" href="photographer.html?id=${id}">
                <img src="${picture}" alt="${name}"></img>
                <h2>${name}</h2>
            </a>
            <p class="city">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
            <p class="price">${price}€/jour</p>`
        return article
    }
    return { name, picture, getUserCardDOM }
}