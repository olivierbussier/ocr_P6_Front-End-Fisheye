class Video {
    constructor(name, likes, src) {
        this._html =
            `<video class="media" controls>
                <source src="assets/gallery/${name}/${src}" aria-label="${likes} likes">
            </video>`
    }
}

class Image {
    constructor(name, likes, src) {
        this._html = `<img
            class="media"
            src="assets/gallery/${name}/medium/${src}"
            alt="${likes} likes">`
    }
}

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
            media = new Image(this._name, likes, image)
        }
        if (video) {
            media = new Video(this._name, likes, video)
        }

        const div = document.createElement( 'section' );
        div.setAttribute("class","photograph-image")
        div.innerHTML =
        `<div class="image-card">
            ${media._html}
            <div class="card-image-header">
                <p>${title}</p>
                <span>${likes}</span>
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
        var e = document.createElement( 'section' )
        e.setAttribute('class', 'photograph-image')
        div.appendChild(e);

        return div
    }
}