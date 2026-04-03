import express from "express";
import musicController from "../controllers/music.controller.js";
import multer from "multer"

const router = express.Router();

const upload = multer({storage: multer.memoryStorage()});

router.post("/create-music", upload.single("music"), musicController.createMusic);


export default router;