const {body, validationResult} = require("express-validator");
const app = require("../app.js")

async function validateResult(req, res, next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({
            message: "Invalid validation rules",
            errors: errors.array()
        })
    }

    next();
}

const registerUserValidationRules = [

    body("userName")
    .isString()
    .withMessage("UserName must be 6 characters long")
    .isLength({
        min:3, max: 20
    }), 

    body("email")
    .isEmail()
    .withMessage("email should be valid"),

    body("password")
    .isStrongPassword()
    .withMessage("password should be strong"),

    validateResult
];

module.exports = {registerUserValidationRules};