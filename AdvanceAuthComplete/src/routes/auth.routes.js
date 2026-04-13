import express from "express"
const authRouter = express.Router();
import * as authController from "../controllers/auth.controller.js"

authRouter.post("/register", authController.register);
authRouter.get("/get-me", authController.getMe);
authRouter.get("/refresh-token", authController.refreshToken);

export default authRouter;