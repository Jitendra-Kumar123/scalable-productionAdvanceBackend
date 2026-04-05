const express = require("express");
const app = express();

app.get("/test", (req, res)=>{
    res.status(200).json({
        message: "this is test api for testing the jest"
    })
})

module.exports = app