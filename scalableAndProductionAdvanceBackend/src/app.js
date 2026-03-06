import express from "express";
import 'dotenv/config'

const app = express();

app.use(express.json());

app.post("/notes", (res, req)=>{
    
})

export {app};