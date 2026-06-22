import PasswordValidator from 'password-validator';

// Create a schema
var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 20
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin123', '123456']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
        case "icon":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 3 || value.length > 50)
                return name + "Length must be between 3-50"
            else
                return ""
        case "email":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 14)
                return name + "Length must be >14"
            else
                return ""
        case "password":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (!schema.validate(value))
                return "Invalid  Password,It must contain max 20 characters,atleast  1 uppercase,1 lowercase,No spaces,1 digit"
            else
                return ""

        case "number":
        case "mobile":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length !== 10)
                return name + "Length must be 10 digits for valid Mobile Number"
            else if (!(value.startsWith("9")) && !(value.startsWith("8")) && !(value.startsWith("7")) && !(value.startsWith("6"))) {
                return name + "is invalid,Not a Mobile Number"
            }

            else
                return ""
        case "pincode":
            if (!value || value.length === 0) {
                return name + "Field is mandatory"
            }
            else if (value.length !== 6) {
                return name + "Length must be 6 digits"
            }
            else
                return ""
        case "city":
        case "state":
            if (!value || value.length === 0) {
                return name + "Field is mandatory"
            }
            else if (value.length < 3) {
                return name + "Length must be 3"
            }
            else
                return ""

        case "shortDescription":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 50 || value.length > 200)
                return name + "Length must be between 50-200"
            else
                return ""
        case "question":
        case "answer":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 10 || value.length > 250)
                return name + "Length must be between 10-250"
            else
                return ""
        case "basePrice":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 1)
                return name + "Length must be >1"
            else
                return ""
        case "stockQuantity":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value < 0)
                return name + "Cannot have negative stock"
            else
                return ""
        case "discount":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value < 0 || value > 100)
                return name + "must be between 0-100%"
            else
                return ""

        default: return ""
    }
}

