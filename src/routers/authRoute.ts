import { Router } from "express";
import authController from '../controllers/authController';
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

router.route("/login").post(authController.login)

router.route("/logout").post(authController.logout)

router.route("/changepassword").post(verifyAccessToken,authController.changePassword)

router.route("/forgotpassword").post(authController.forgotPassword)

export default router