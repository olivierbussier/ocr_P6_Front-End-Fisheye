import { FormValidator } from "./FormValidator.js";

export class ModalForm {
    constructor() {
        this._modal = document.getElementById("contact-modal")
        this._buttonDisplay = document.querySelector(".photograph-header button.button")
        this._buttonClose = document.querySelector(".modal img.close-item")
        this._buttonSubmit = this._modal.querySelector("form button.button")
        this._form = document.querySelector(".modal form")
        this.setupEventModal()
        this._formValidator = new FormValidator(document.querySelectorAll("form input, form textarea"))
    }
    handleOpenModal() {
        // Recherche du champ avec l'attribut "autofocus" afin de positionner le focus dessus
        this._modal.style.display = "flex"
        this._modal.querySelector("input[autofocus]").focus()

    }
    handleCloseModal(key) {
        if (key === 27) {   // escape
            this._modal.style.display = "none"
        }
    }

    handleSubmitModal(e) {
        e.preventDefault()
        if (this._formValidator.checkFields()) {
            const values = JSON.stringify(this._formValidator.getFieldsValue())
            console.log(values)
            const rawResponse = fetch('http://127.0.0.1:5501/post', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: values
            });
            this.handleCloseModal(27)
            this._formValidator.clearFields()
        }
    }
    /**
     * Mise en place des hooks pour la modal de contact
     */
    setupEventModal() {

        // Add event listener to open the modal
        this._buttonDisplay.addEventListener('click', (e) => this.handleOpenModal())

        // Add event listener to close the modal
        this._buttonClose.addEventListener('click', (e) => this.handleCloseModal(27))
        window.addEventListener('keydown', (e) => this.handleCloseModal(e.keyCode))

        // Add event listener on submit button
        this._form.addEventListener('submit', (e) => {this.handleSubmitModal(e)})
    }
}
