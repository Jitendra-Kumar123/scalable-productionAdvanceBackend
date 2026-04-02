import express from "express";
import musicController from "../controllers/music.controller";


const router = express.Router();

router.post("/create-music", musicController)


export default router;