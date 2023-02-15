import { Router } from "express";
import loginController from "../controllers/loginController";

const router = Router()

router.route("/login").post(loginController)

export default router