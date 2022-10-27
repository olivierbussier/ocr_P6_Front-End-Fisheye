export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Article creation
        const article = document.createElement( 'article' );

        // Image creation
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        // Header  H2
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // City
        const pCity = document.createElement( 'p' );
        pCity.textContent = city + ', ' + country ;
        pCity.classList.add('city')

        // Tagline
        const pTag = document.createElement( 'p' );
        pTag.textContent = tagline;
        pTag.classList.add('tagline')

        // Price
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + '€/jour';
        pPrice.classList.add('price')

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTag);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}