import { Router } from "express";
import { verifyAccessToken } from '../config/jwtToken';
import { dashboardController } from '../controllers/dashboardController';

const router = Router()

router.route("/dashboard/:id").get(verifyAccessToken, dashboardController.dashboard)

export default router