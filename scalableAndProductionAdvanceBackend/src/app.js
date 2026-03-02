import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.send("running on api endpoint");
});

const notes = [{
    title: test-title,
    description: test-description
}];

app.post("/notes", (req, res) => {
    console.log(req.body);
    res.send(notes);
})


export {app};