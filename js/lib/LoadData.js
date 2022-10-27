export class LoadData {
    constructor (url) {
        this._url = url
    }

    async fetchData () {
        return await fetch(this._url)
        .then((response) => response.json())
        .then((data) => {
            return data.photographers
        })
    }
}