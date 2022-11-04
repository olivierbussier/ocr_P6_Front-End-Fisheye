/* -------------------------------------------
* Check text entry fills constraints
 * function gets constraints fromattributes :
 *  - check if required attribute is present
 *  - test field among minlength & maxlength if present
*/
export const checkArea = (field) => {

    // Get attributes
    const minL = field.getAttribute('minlength'); const minLength = (minL === null ? null : parseInt(minL))
    const maxL = field.getAttribute('maxlength'); const maxLength = (maxL === null ? null : parseInt(maxL))
    const req  = field.getAttribute('required'); const required = (req === null ? false : true)

    // Check of field constraints
    const textLength = field.value.length;

    if (!required && textLength === 0) {
        // Return ok if the field is not required and strlen == 0
        return {result: true, message: ""}
    }
    if (minLength !== null && textLength < minLength) {
        return {result: false, message: "Votre saisie est trop courte, il faut au moins " + minLength + " caractères"}
    }
    if (maxLength !== null && textLength > maxLength) {
        return {result: false, message: "Votre saisie est trop longue, il faut au maximum " + maxLength + " caractères"}
    }
    // Field constraints are fullfiled
    return {result: true, message: ""};

}
