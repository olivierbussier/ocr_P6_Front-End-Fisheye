export class LoadPhotographersData {
    constructor (url) {
        console.log(url)
        this._url = url
        this._data = null
    }

    /**
     * Fonction synchrone de chargement des données photographes et médias
     * @returns
     */
    async fetchData () {
        return await fetch(this._url)
        .then((response) => response.json())
        .then((data) => {
            this._data = data
        })
    }

    /**
     * si id == null => Retourne un tableau d'objets contenant la description de chaque photographe
     * si id != null => Retourne un tableau d'un seul élément, celui du photographe concerné
     *
     * @param {number=} id
     * @returns {{name:string, id:number, city:string, country:string, tagline:string, price:number, portrait:string}[]}
     */
    getPhotographersCards(id = null) {
        if (id === null) {
            return this._data.photographers
        } else {
            // Destructure le tableau en ne retournant que le 1er élément
            return this._data.photographers.filter(data => data.id === id)[0]
        }
    }

    /**
     * Retourne un tableau d'objets avec les médias d'un artiste identifié par son id
     * @param {number} id id de l'artiste
     * @returns {{id: number, photographerId:number, title:string, image:string, likes:number, date:date, price:number}[]} tableau d'objects média
     */
    getPhotographersMedia(id) {
        return this._data.media.filter(data => data.photographerId === id)
    }
}
