import express from "express"
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register-user", authController.registerUser);
router.post("/login-user", authController.loginUser);
router.post("/logout-user", authController.logoutUser);

export default router;