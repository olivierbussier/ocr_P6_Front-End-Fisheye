class PhotographerImageFactory {
    constructor(name, image) {
        this._image = image
        this._name = name
    }
    getDOM() {
        const image = this._image.image
        const video = this._image.video
        const title = this._image.title
        const likes = this._image.likes
        let media

        if (image) {
            media = `<img class="media" src="assets/gallery/${this._name}/${image}">`;
        }
        if (video) {
            media =
            `<video class="media" controls>
                <source src="assets/gallery/${this._name}/${video}">
            </video>`;
        }

        const div = document.createElement( 'section' );
        div.setAttribute("class","photograph-image")
        div.innerHTML =
        `<div class="image-card">
            ${media}
            <div class="card-image-header">
                <p>${title}</p>
                <p>${likes}</p>
            </div>
        </div>`
        return div
    }

}

export class PhotographerGalleryFactory {
    constructor(name, images) {
        this._images = images
        this._name = name
    }
    getDOM() {
        // Article creation
        const div = document.createElement( 'section' );
        div.setAttribute("class","photograph-gallery")

        this._images.forEach((image) => {
            div.appendChild(new PhotographerImageFactory(this._name, image).getDOM())
        })
        return div
    }
}