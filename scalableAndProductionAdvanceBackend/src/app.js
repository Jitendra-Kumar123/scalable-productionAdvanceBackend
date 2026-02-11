import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.send("running on api endpoint");
});

export {app};