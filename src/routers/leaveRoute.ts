import { Router } from "express";
import { leaveController } from "../controllers/leaveController";
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

// all employee can add leave so that only token need to check

router.route("/addLeave").post(verifyAccessToken, leaveController.addLeave)
router.route("/updateLeave").patch(verifyAccessToken, leaveController.updateLeave)
router.route("/deleteLeave").delete(verifyAccessToken, leaveController.deleteLeave)
router.route("/getallLeave").get(verifyAccessToken, leaveController.getAllLeave)
router.route("/getLeave/:id").get(verifyAccessToken, leaveController.getLeave)

export default router