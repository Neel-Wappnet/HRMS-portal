import { Router } from "express";
import authController from '../controllers/authController';

const router = Router()

router.route("/login").post(authController.login)

router.route("/logout").post(authController.logout)

router.route("/changepassword").post(authController.changePassword)

router.route("/forgotpassword").post(authController.forgotPassword)

export default router