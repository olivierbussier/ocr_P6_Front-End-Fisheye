/** ---------------------------------------------------
 * Check of date & constraints validity
 *  - check if required attribute is present
 *  - test field among min & max dates if present
 */
export const checkDate = (field) => {

    // Get attributes
    const req  = field.getAttribute('required'); const required = (req === null ? false : true)
    const minD  = field.getAttribute('min'); const minDate = (minD === null ? null : new Date (minD))
    const maxD  = field.getAttribute('max'); const maxDate = (maxD === null ? null : new Date (maxD))

    // Check of field constraints
    const textLength = field.value.length;

    if (!required && textLength === 0) {
        // Return ok if the field is not required
        // and strlen == 0
        return {result: true, message: ""}
    }

    const date = new Date(field.value)

    // check date constraints

    if (!date instanceof Date || isNaN(date)) {
        // If field constraints are fullfiled
        return {result: false, message: "La date entrée est incorrecte"};
    }
    if (minDate !== null && date < minDate) {
        // If field constraints are fullfiled
        return {result: false, message: "La date entrée est trop ancienne"};
    }
    if (maxDate !== null && date > maxDate) {
        return {result: false, message: "La date entrée est trop grande"}
    }
    return {result: true, message: ""}
}
