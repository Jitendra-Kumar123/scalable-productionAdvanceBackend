import express from "express"
const router = express.Router();
import authController from "../controllers/Auth.controller.js"

router.post("/registerUser", authController.registerUser);

export default {router};