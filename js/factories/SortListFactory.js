export class SortListFactory {
    constructor(choices, defaultChoice) {
        this._sortOrder = defaultChoice
        this._choices = choices
        this._select = document.createElement( 'select' );

        let cnt = 0
        this._choices.forEach(element => {
            if (cnt++ > 0) {
                const option = document.createElement('option')
                option.setAttribute("disabled", "")
                this._select.appendChild(option)
            }
            const option = document.createElement('option')
            option.setAttribute("value", element.method)
            if (element.method === this._sortOrder)
                option.setAttribute("selected", "")
            option.textContent = element.sort
            this._select.appendChild(option)
        });
        this._select.addEventListener('change', (e) => {
            const sel = e.target
            const sortValue = sel.options[sel.selectedIndex].value
            this._sortOrder = sortValue
            if (this._hook) {
                this._hook(sortValue)
            }
        })
    }

    setHook(hookFunction) {
        this._hook = hookFunction
    }

    getDOM() {
        return this._select
    }

}
