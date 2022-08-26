const validator = require('validator');
const bcrypt = require('bcrypt')


//cleans and sanitizes the Strings and removes the white spaces before sending it to the database
const stringWithoutSpacingCleaner = (string) => {
    const stringValue = validator.escape(string).trim(string);
    if (validator.isLength(stringValue, { min: 1, max: 30 })) {
        return stringValue;
    } else {
        return false;
    }
}

//cleans and sanitizes the Strings and leaves the white spaces before sending it to the database
const stringWithSpacingCleaner = (string) => {
    const stringValue = validator.escape(string);
    if (validator.isLength(stringValue, { min: 1, max: 30 })) {
        return stringValue;
    } else {
        return false;
    }
}

//cleans and sanitizes the date before sending it to the database
const dateCleaner = (dateString) => {
    const date = validator.escape(dateString).trim(dateString);
    if (validator.isDate(date)) {
        const cleanedDate = validator.toDate(date);
        return cleanedDate;
    } else {
        return false;
    }
}

//cleans and sanitizes the Document ID before sending it to the database
const mongoDbIdCleaner = (idString) => {
    const id = validator.escape(idString).trim(idString);
    if (validator.isMongoId(id)) {
        return id;
    } else {
        return false;
    }
}

//check if the value is empty before processing it
const isValueEmptyOrUndefined = (value) => {
    if (value == undefined || validator.isEmpty(value)) {
        return true;
    } else {
        return false;
    }
}




module.exports = {
    stringWithoutSpacingCleaner,
    stringWithSpacingCleaner,
    dateCleaner,
    mongoDbIdCleaner,
    isValueEmptyOrUndefined

}