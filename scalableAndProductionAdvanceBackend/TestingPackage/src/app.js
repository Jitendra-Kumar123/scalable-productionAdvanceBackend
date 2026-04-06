const express = require("express");
const app = express();
const validationRules = require("./middlewares/validation.middleware.js");

app.use(express.json());

// app.get("/test", (req, res)=>{
//     res.status(200).json({
//         message: "this is test api for testing the jest"
//     });
// })

app.post("/register",validationRules.registerUserValidationRules, (req, res) => {
    const {userName, email, password} = req.body;

    res.status(200).json({
        message: "User Registered Successfully",
        user: {
            userName, email
        }
    })
})

module.exports = app