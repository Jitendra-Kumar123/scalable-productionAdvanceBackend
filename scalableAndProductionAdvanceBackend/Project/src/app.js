import express from "express"
const app = express();
import "dotenv/config"
import multer from "multer"

app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async(req, res)=>{
    console.log(req.body);
    console.log(req.file);
})

export {app};