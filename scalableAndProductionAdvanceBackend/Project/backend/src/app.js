import express from "express"
const app = express();
import "dotenv/config"
import cors from 'cors'
import multer from "multer"
import { uploadFile } from "./services/storage.service.js"
import postModel from "./model/post.model.js"

app.use(cors());
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async(req, res)=>{

    const result = await uploadFile(req.file.buffer);
    
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    res.status(201).json({
        message: "Post Created Successfully",
        post
    })
})

app.get("/posts", async(req, res) => {
    const posts = await postModel.find();

   return res.status(200).json({
        message: "Post Fetched Successfully",
        posts
    })
})

export {app};