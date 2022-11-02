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
        this._images.forEach((elem, index) => console.log(index, elem))
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
        if (!div.getAttribute('disabled'))
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
                    this._prevDiv.classList.remove('disabled')
                    console.log('prev', prevImage)
                } else {
                    this._prevDiv.setAttribute('data-id', '')
                    this._prevDiv.classList.add('disabled')
                    console.log('No prev')
                }
                if (index < this._images.length - 1) {
                    nextImage = this._images[index+1]
                    this._nextDiv.setAttribute('data-id', nextImage.id)
                    this._nextDiv.classList.remove('disabled')
                    console.log('next', nextImage)
                } else {
                    this._nextDiv.setAttribute('data-id', '')
                    this._nextDiv.classList.add('disabled')
                    console.log('No next')
                }
            }
        })
    }

    listenImage(event) {
        const id = event.target.parentNode.querySelector('img[data-id]').getAttribute('data-id')
        this.affFullImage(id)
    }
}