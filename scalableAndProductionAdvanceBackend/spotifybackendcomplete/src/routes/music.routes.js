import express from "express";
import musicController from "../controllers/music.controller.js";
import multer from "multer"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router();

const upload = multer({storage: multer.memoryStorage()});

router.post("/create-music",authMiddleware.authArtist, upload.single("music"), musicController.createMusic);

router.post("/album",authMiddleware.authArtist, musicController.createAlbum);

router.get("/listen-music", authMiddleware.authUser, musicController.getAllMusic);

router.get("/albums", authMiddleware.authUser, musicController.getAllAlbum);

router.get("/album/:albumId", authMiddleware.authUser, musicController.getAlbumById);

export default router;