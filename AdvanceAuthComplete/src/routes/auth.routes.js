import express from "express"
const authRouter = express.Router();
import * as authController from "../controllers/auth.controller.js"

authRouter.post("/register", authController.register);

authRouter.get("/get-me", authController.getMe);

authRouter.get("/refresh-token", authController.refreshToken);

authRouter.get("/logout", authController.logout);

authRouter.get("/logoutAllDevices", authController.logoutAllDevices);

authRouter.post("/login", authController.login);

authRouter.post("/verify-email", authController.verifyEmail);

export default authRouter;