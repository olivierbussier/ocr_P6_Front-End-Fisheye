export class SortListFactory {
    constructor(defaultOrder = "titre") {
        this._sortOrder = defaultOrder
        this._choices =[
            {sort: 'Popularité', method: 'popularite'},
            {sort: 'Date', method: 'date'},
            {sort: 'Titre', method: 'titre'}

        ]
    }
    getDOM() {

        const div = document.createElement( 'div' );
        div.setAttribute("class","photograph-sort")

        const p = document.createElement( 'p' );
        p.textContent = "Trier par : "
        div.appendChild(p)

        const select = document.createElement( 'select' );
        div.appendChild(select)

        this._choices.forEach(element => {
            const option = document.createElement('option')
            option.setAttribute("value", element.method)
            if (element.method === this._sortOrder)
                option.setAttribute("selected", "")
            option.textContent = element.sort
            select.appendChild(option)
        });
        return div
    }

}
