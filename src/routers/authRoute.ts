import { Router } from "express";
import authController from '../controllers/authController';
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

router.route("/login").post(authController.login)

router.route("/logout").post(authController.logout)

router.route("/forgotpassword").post(authController.forgotPassword)

router.route("/forgotpassword/newpassword").post(authController.newPassword)




export default router