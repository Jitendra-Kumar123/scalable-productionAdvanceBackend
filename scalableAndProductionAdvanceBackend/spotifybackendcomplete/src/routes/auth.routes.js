import express from "express"
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register-user", authController.registerUser);
router.post("/login-user", authController.loginUser);


export default router;