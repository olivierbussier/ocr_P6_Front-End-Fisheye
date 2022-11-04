 /**
 * This file implements validation of form fields
 */
import { checkText   } from "./checkers/check-text.js"
import { checkEmail  } from "./checkers/check-email.js"
import { checkDate   } from "./checkers/check-date.js"
import { checkNumber } from "./checkers/check-number.js"
import { checkArea }   from "./checkers/check-area.js"

export class FormValidator {
    /**
     * Check if user entries are correct
     *
     * @param {HTMLElement[]} inputArray
     * @param {{ fieldLabel: string, fieldType: string}[]} validationModelArray
     */
    constructor(inputArray) {
        // Select all inputs to test
        this._inputs = inputArray
    }

    /**
     *
     * @returns {{name: string, value: string}[]}
     */
    getFieldsValue() {
        var result = []
        var f = {}
        this._inputs.forEach((field) => {
            f.name = field.name
            f.value = field.value
            result.push(structuredClone(f))
        })
        return result
    }

    clearFields() {
        this._inputs.forEach((element) => {
            element.value = ''
            element.parentElement.setAttribute("data-error", "")
            element.parentElement.setAttribute("data-error-visible", false)
        })
    }

    checkFields(e) {
        // Prevent submit of form
        let validationFailed = false
        let a

        const validationFunctions = {
            text:    checkText,
            email:   checkEmail,
            date:    checkDate,
            number:  checkNumber,
            textarea: checkArea
        }

        this._inputs.forEach((field) => {
            const validationFunction = validationFunctions[field.getAttribute('type')]
            if (validationFunction) {
                a = validationFunction(field)
                const formData = field.parentElement;
                if (a.result == true) {
                    // Field constraints are fullfilled
                    // Clear eventually previous error message
                    formData.setAttribute("data-error", "")
                    formData.setAttribute("data-error-visible", false)
                } else {
                    validationFailed = true
                    // Get previous formData class in order to fill
                    // error-msg attached to it

                    // Select :after pseudo class and then message zone
                    formData.setAttribute("data-error", a.message)
                    formData.setAttribute("data-error-visible", true)
                }
            } else {
                throw "Field type non pris en charge"
            }
        })
        return !validationFailed
    }
}
