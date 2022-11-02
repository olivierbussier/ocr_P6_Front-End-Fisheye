import { Image, Video } from "./PhotographerGalleryFactory.js"

export class LightBoxFactory {
    constructor(name, images) {
        this._name = name
        this._images = images
        this._prevDiv = document.querySelector('#light-box div.prev')
        this._nextDiv = document.querySelector('#light-box div.next')
        this._prevDiv.addEventListener('click', (event) => this.prevNextEventHandler('prev'))
        this._nextDiv.addEventListener('click', (event) => this.prevNextEventHandler('next'))
        this.listenControls()
    }

    listenControls() {
        // Set-up events to close modal
        document.querySelector('#light-box img.close-item').addEventListener('click', (event) => {
            const lightBox = document.querySelector('#light-box')
            lightBox.setAttribute('style','display: none')
        })
    }

    prevNextEventHandler(divText) {
        const div = document.querySelector('#light-box div.' + divText)
        this.affFullImage(div.getAttribute('data-id'))
    }

    affFullImage(id) {
        this._images.forEach((elem, index) => {
            if (elem.id === parseInt(id)) {
                // Get Light box
                const lightBox = document.querySelector('#light-box')
                // replace img src in "light-box img.img-full"
                const lbIm = document.querySelector('#light-box .media-content')
                if (elem.video) {
                    lbIm.innerHTML = new Video(this._name, elem.likes, elem.video, 'full')._html
                } else if (elem.image) {
                    lbIm.innerHTML = new Image(this._name, elem.likes, elem.image, 'full')._html
                }
                lightBox.setAttribute('style', 'display: flex')

                var prevImage, nextImage

                if (index > 0) {
                    prevImage = this._images[index - 1]
                    this._prevDiv.setAttribute('data-id', prevImage.id)
                } else {
                    this._prevDiv.setAttribute('disabled', '')
                    this._prevDiv.setAttribute('data-id', '')
                }
                if (index < this._images.length - 1) {
                    nextImage = this._images[index+1]
                    this._nextDiv.setAttribute('data-id', nextImage.id)
                } else {
                    this._nextDiv.setAttribute('disabled', '')
                    this._nextDiv.setAttribute('data-id', '')
                }
            }
        })
    }

    listenImage(event) {
        const id = event.target.parentNode.querySelector('img[data-id]').getAttribute('data-id')
        this.affFullImage(id)
    }
}