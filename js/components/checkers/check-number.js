/** ---------------------------------------------------
 * Check of number & constraints validity
 *  - check if required attribute is present
 *  - test field among min & max numbers if present
 */
export const checkNumber = (field) => {

    // Get attributes
    const req  = field.getAttribute('required'); const required = (req === null ? false : true)
    const minN  = field.getAttribute('min'); const minNum = (minN === null ? null : parseInt(minN))
    const maxN  = field.getAttribute('max'); const maxNum = (maxN === null ? null : parseInt(maxN))

    // Check of field constraints
    const textLength = field.value.length;

    if (!required && textLength === 0) {
        // Return ok if the field is not required
        // and strlen == 0
        return {result: true, message: ""}
    }

    const num = parseInt(field.value)

    // check date constraints

    if (!num instanceof Number || isNaN(num)) {
        // If field constraints are fullfiled
        return {result: false, message: "La nombre est incorrect"};
    }
    if (minNum !== null && num < minNum) {
        // If field constraints are fullfiled
        return {result: false, message: "Le nombre entré est trop petit"};
    }
    if (maxNum !== null && num > maxNum) {
        return {result: false, message: "Le nombre entré est trop grand"}
    }
    return {result: true, message: ""}
}
