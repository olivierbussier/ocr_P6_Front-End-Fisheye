/** ---------------------------------------------------
 * Check of email address & constraints validity
 *  - email adress has correct format [user]@[domain].[extension]
 *  - check if required attribute is present
 */
export const checkEmail = (field) => {

    // Get attributes
    const req  = field.getAttribute('required'); const required = (req === null ? false : true)

    // Check of field constraints
    const textLength = field.value.length;

    if (!required && textLength === 0) {
        // Return ok if the field is not required
        // and strlen == 0
        return {result: true, message: ""}
    }

    // check mail expression using regex

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (reg.test(field.value) === true) {
        // If field constraints are fullfiled
        return {result: true, message: ""};
    } else {
        return {result: false, message: "Votre adresse mail est incorrecte"}
    }
}
