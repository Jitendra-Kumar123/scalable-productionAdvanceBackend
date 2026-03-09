import express from "express";
import 'dotenv/config'
import {noteModel}  from "./Models/Note.model.js";

const app = express();

app.use(express.json());

app.post("/notes", async (req, res)=>{
    const data = req.body;

    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note Created"
    })
})

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(201).json({
        message: "Note fetched",
        notes
    })
})

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(201).json({
        message: "Note Deleted Successfully"
    })
})
export {app};