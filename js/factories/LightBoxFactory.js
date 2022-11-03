import { Image, Video } from "./PhotographerGalleryFactory.js"

export class LightBoxFactory {
    constructor(name, images) {
        this._name = name
        this._images = images
        this._prevDiv = document.querySelector('#light-box div.prev')
        this._nextDiv = document.querySelector('#light-box div.next')

        var new_element
        const newPrevDiv = this._prevDiv.cloneNode(true);
        this._prevDiv.parentNode.replaceChild(newPrevDiv, this._prevDiv);
        const newNextDiv = this._nextDiv.cloneNode(true);
        this._nextDiv.parentNode.replaceChild(newNextDiv, this._nextDiv);

        this._prevDiv = newPrevDiv
        this._nextDiv = newNextDiv

        this.listenControls()
    }

    closeHook(keyCode) {
        if (keyCode === 27) {
        const lightBox = document.querySelector('#light-box')
        lightBox.setAttribute('style','display: none')
        }

    }
    /**
     *
     */
    listenControls() {
        // Click sur images < et >
        this._prevDiv.addEventListener('click', (event) => this.prevNextEventHandler(37))
        this._nextDiv.addEventListener('click', (event) => this.prevNextEventHandler(39))

        // Fleches gauches et droite
        window.addEventListener('keydown', (event) => this.prevNextEventHandler(event.keyCode))

        // click sur image X
        document.querySelector('#light-box img.close-item').addEventListener('click', (event) => this.closeHook(27))
        window.addEventListener('keydown', (event) => this.closeHook(event.keyCode))
    }

    /**
     *
     * @param {string} divText
     */
    prevNextEventHandler(key = null) {

        var divText

        if (key === 37) {
            divText = 'prev'
        } else if (key === 39) {
            divText = 'next'
        } else {
            return
        }
        const div = document.querySelector('#light-box div.' + divText)
        if (!div.getAttribute('disabled')) {
            this.affFullImage(div.getAttribute('data-id'))
        }
    }

    /**
     *
     * @param {integer} id
     */
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
                } else {
                    this._prevDiv.setAttribute('data-id', '')
                    this._prevDiv.classList.add('disabled')
                }
                if (index < this._images.length - 1) {
                    nextImage = this._images[index+1]
                    this._nextDiv.setAttribute('data-id', nextImage.id)
                    this._nextDiv.classList.remove('disabled')
                } else {
                    this._nextDiv.setAttribute('data-id', '')
                    this._nextDiv.classList.add('disabled')
                }
            }
        })
    }

    /**
     *
     * @param {event} event
     */
    listenImage(event) {
        const id = event.target.parentNode.querySelector('img[data-id]').getAttribute('data-id')
        this.affFullImage(id)
    }
}