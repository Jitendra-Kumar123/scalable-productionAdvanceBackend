import express from "express"
const router = express.Router();
import authController from "../controllers/Auth.controller.js"

router.post("/register-user", authController.registerUser);

export default router;