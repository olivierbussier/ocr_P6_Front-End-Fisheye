/**
 * Liste de choix customisable
 */
export class CustomListBox {

    /**
     *
     * Composant réutilisable de listbox full customisable.
     *
     * Le composant se comporte comme une liste <select><option></select>, lorsqu'un
     * nouveau choix est fait par l'utilisateur.
     *
     * Constructeur
     * - const customList = new CustomListBox(choices, defaultChoice)
     *
     * il est possible d'enregistrer une callback qui sera invoquée sur changement de choix :
     * - customList.setHook(method)
     *
     * Pour récupérer le HTMLelement à intégrer dans le DOM via appenChild par exemple
     * - customList.getDomElement()
     *
     * La structure du DOM créée est la suivante:
     *
     * <div class="custom-select">
     *      <select>
     *          <option name value>Option label</option>
     *          ...
     *      </select>
     *      <div class="select-selected"></div>
     *      <div class="select-items">
     *          <div data-value="">option label</div>
     *          ...
     *      </div>
     * </div>`
     *
     * @param {{label: string, action: string}[]} choices Liste des options possibles dans le select
     * @param {string} defaultChoice Une des actions définies dans le parametre 'choices'
     */
    constructor(choices, defaultChoice) {

        this._sortOrder = defaultChoice
        this._choices = choices

        // Création de l'élément container glogal
        this._divContainer = document.createElement( 'div' );
        this._divContainer.setAttribute('class', 'custom-select')

        // Création du select
        this._select = document.createElement( 'select' );
        this._divContainer.appendChild(this._select)

        // Création des options dans le select
        let cnt = 0
        choices.forEach(element => {
            const option = document.createElement('option')
            if (cnt++ > 0) {
                option.setAttribute("disabled", "")
                this._select.appendChild(option)
            }
            option.setAttribute("value", element.action)
            if (element.action === this._sortOrder)
                option.setAttribute("selected", "")
            option.textContent = element.label
            this._select.appendChild(option)
        });

        var i, j, length;

        // Recherche de la listbox dans le flux
        const selElmnt = this._select

        // Nombre d'éléments de type custom-select
        length = selElmnt.length;

        const lengthSelect = selElmnt.length;

        // Pour chaque element, creer une DIV en // de l'item séléctionné
        this._divSelectedItem = document.createElement("div");
        this._divSelectedItem.setAttribute("class", "select-selected");
        this._divSelectedItem.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        this._divContainer.appendChild(this._divSelectedItem);

        // Pour chaque element, creer une DIV qui reprend la liste des options
        const divSel = document.createElement("div");
        divSel.setAttribute("class", "select-items select-hide");

        for (j = 0; j < lengthSelect; j++) {
            // Pour chaque element, creer une DIV qui reprend une option
            const divOpt = document.createElement("div");
            divOpt.innerHTML = selElmnt.options[j].innerHTML;
            divOpt.setAttribute('data-value', selElmnt.options[j].value)
            divOpt.addEventListener("click", (e) => {
                const currentElement = e.target
                // Update de la select box avec le nouveu choix
                var i, j;
                const originalSelect = this._select
                const originalSelectLength = originalSelect.length;

                for (i = 0; i < originalSelectLength; i++) {
                    if (originalSelect.options[i].innerHTML == currentElement.innerHTML) {

                        originalSelect.selectedIndex = i;
                        this._divSelectedItem.innerHTML = currentElement.innerHTML;
                        const currentItemSelected = currentElement.parentNode.getElementsByClassName("same-as-selected");

                        for (j = 0; j < currentItemSelected.length; j++) {
                            currentItemSelected[j].removeAttribute("class");
                        }
                        // On marque cet item
                        currentElement.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                // On simule un click sur la liste select
                this._divContainer.click();

                // Appel a la callback si celle-ci a été définie
                // En parametre la valeur de l'option séléctionnée
                if (this._hookFunction) {
                    this._hookFunction(currentElement.getAttribute('data-value'))
                }

            });
            divSel.appendChild(divOpt);
        }
        this._divContainer.appendChild(divSel);
        this._divSelectedItem.addEventListener("click", function (e) {
            // Fermer les autres list box éventuelles lorsque celle-ci est séléctionnée
            e.stopPropagation();
            this.closeAllSelect(this);
            e.target.nextSibling.classList.toggle("select-hide");
            e.target.classList.toggle("select-arrow-active");
        }.bind(this));

        // Fermer toutes less list box éventuelles lorsque on clique en dehors
        document.addEventListener("click", this.closeAllSelect);
    }

    /**
     *
     * @returns {HTMLElement}
     */
    getDomElement() {
        return this._divContainer
    }

    /**
     *
     * @callback hook
     * @param {string: action}
     *
     * @param {hook} hook Methode de type callback
     */
    setHook(hook) {
       this._hookFunction = hook
    }


    /**
     * @param {HTMLElement} element
     *
     */
    closeAllSelect(element) {
        // Ferme toutes les CustomListBox, sauf la courante
        var i, arrNo = [];
        const selItems = document.getElementsByClassName("select-items");
        const selSelected = document.getElementsByClassName("select-selected");
        const lengthItems = selItems.length;
        const lengthSelected = selSelected.length;

        for (i = 0; i < lengthSelected; i++) {
            if (element == selSelected[i]) {
                arrNo.push(i)
            } else {
                selSelected[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < lengthItems; i++) {
            if (arrNo.indexOf(i)) {
                selItems[i].classList.add("select-hide");
            }
        }
    }
}
