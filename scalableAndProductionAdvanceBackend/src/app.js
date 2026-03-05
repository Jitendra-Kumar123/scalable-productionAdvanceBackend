import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("running on api endpoint");
});

const notes = [];

app.post("/notes", (req, res) => {
    notes.push(req.body);

    res.status(201).json({
        message: "note created successfully"
    })
})

app.get("/notes", (req, res)=>{
    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })
})

app.delete("/notes/:index", (req, res) => {
    const index = req.params.index
    console.log(req.params)
    delete notes [index]

    res.status(200).json({
        message: "note deleted successfully"
    })
})

app.patch("/notes/:index", (req, res) => {
    const index = req.params.index

    const {title, description} = req.body

    notes[index].title = title
    notes[index].description = description

    console.log(notes[index])

    res.status(200).json({
        message: "note updated successfully"
    })
})


export {app};