import { Router } from "express";
import { verifyAccessToken } from "../config/jwtToken";
import { userController } from "../controllers/userController";

const router = Router()
router.route("/changepassword").post(verifyAccessToken, userController.changePassword)
router.route("/getuser/:id").get(verifyAccessToken, userController.getUser)

export default router