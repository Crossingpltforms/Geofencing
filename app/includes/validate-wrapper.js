import validation from "./validation.js"
import validatejs from "./validate.js"
export default function validate(fieldName, value) {
    var formValues = {}
    formValues[fieldName] = value

    var formFields = {} //temmporary form with validation message for particular feild
    formFields[fieldName] = validation[fieldName]

    // The formValues and validated against the formFields
    // the variable result hold the error messages of the field
    const result = validatejs(formValues, formFields)
    // console.log("result=>",result)
    // If there is an error message, return it!
    if (result) {
        // Return only the field error message if there are multiple
        return result;
    }
    return null
}