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
            const target = field.querySelectorAll('input, textarea')[0]
            f.name = target.name
            f.value = target.value
            result.push(structuredClone(f))
        })
        return result
    }

    clearFields() {
        this._inputs.forEach((element) => {
            const target = field.querySelectorAll('input, textarea')[0]
            target.value = ''
            target.parentElement.setAttribute("data-error", "")
            target.parentElement.setAttribute("data-error-visible", false)
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
            const target = field.querySelectorAll('input, textarea')[0]
            var validationFunction
            if (target.type === 'textarea') {
                validationFunction = validationFunctions['textarea']
            } else {
                validationFunction = validationFunctions[target.getAttribute('type')]
            }
            if (validationFunction) {
                a = validationFunction(target)
                const formData = target.parentElement;
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
