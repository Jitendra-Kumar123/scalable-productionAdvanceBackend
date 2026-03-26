import express from "express"
const app = express();
import "dotenv/config"
import multer from "multer"
import { uploadFile } from "./services/storage.service.js"

app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async(req, res)=>{
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file);
    console.log(result);
})

export {app};