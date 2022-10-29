function l(a) {
    console.log(a)
}
export class customListBox {

    constructor(choices, defaultChoice) {

        this._sortOrder = defaultChoice
        this._choices = choices

        // Création de l'élément container glogal
        this._divContainer = document.createElement( 'div' );
        this._divContainer.setAttribute('class', 'custom-select')

        this._select = document.createElement( 'select' );
        this._divContainer.appendChild(this._select)

        let cnt = 0
        choices.forEach(element => {
            const option = document.createElement('option')
            if (cnt++ > 0) {
                option.setAttribute("disabled", "")
                this._select.appendChild(option)
            }
            option.setAttribute("value", element.method)
            if (element.method === this._sortOrder)
                option.setAttribute("selected", "")
            option.textContent = element.sort
            this._select.appendChild(option)
        });

        var i, j, length;

        // Recherche de la listbox dans le flux

        const selElmnt = this._select

        // Nombre d'éléments de type custom-select
        length = selElmnt.length;

        const lengthSelect = selElmnt.length;

        /* For each element, create a new DIV that will act as the selected item: */
        this._divSelectedItem = document.createElement("div");
        this._divSelectedItem.setAttribute("class", "select-selected");
        this._divSelectedItem.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        this._divContainer.appendChild(this._divSelectedItem);

        /* For each element, create a new DIV that will contain the option list: */
        const divSel = document.createElement("div");
        divSel.setAttribute("class", "select-items select-hide");

        for (j = 0; j < lengthSelect; j++) {
            /* For each option in the original select element,
                create a new DIV that will act as an option item: */
            const divOpt = document.createElement("div");
            divOpt.innerHTML = selElmnt.options[j].innerHTML;
            divOpt.setAttribute('data-value', selElmnt.options[j].value)
            divOpt.addEventListener("click", (e) => {
                const currentElement = e.target
                /* When an item is clicked, update the original select box,
                    and the selected item: */
                var i, j;
                const originalSelect = this._select // parentNode.parentNode.getElementsByTagName("select")[0];
                const originalSelectLength = originalSelect.length;

                for (i = 0; i < originalSelectLength; i++) {
                    if (originalSelect.options[i].innerHTML == currentElement.innerHTML) {
                        originalSelect.selectedIndex = i;
                        this._divSelectedItem.innerHTML = currentElement.innerHTML;
                        const currentItemSelected = currentElement.parentNode.getElementsByClassName("same-as-selected");

                        for (j = 0; j < currentItemSelected.length; j++) {
                            currentItemSelected[j].removeAttribute("class");
                        }
                        currentElement.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                this._divContainer.click();
                if (this._hookFunction) {
                    this._hookFunction(currentElement.getAttribute('data-value'))
                }

            });
            divSel.appendChild(divOpt);
        }
        this._divContainer.appendChild(divSel);
        this._divSelectedItem.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            this.closeAllSelect(this);
            e.target.nextSibling.classList.toggle("select-hide");
            e.target.classList.toggle("select-arrow-active");
        }.bind(this));

        /* If the user clicks anywhere outside the select box,
            then close all select boxes: */
        document.addEventListener("click", this.closeAllSelect);

        //return this._divContainer
    }

    getCustomElement() {
        return this._divContainer
    }

    setHook(hook) {
        this._hookFunction = hook
    }

    closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
        }
        for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
        }
    }
}
