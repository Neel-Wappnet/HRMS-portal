import { Router } from "express";
import { leaveController } from "../controllers/leaveController";
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

router.route("/addLeave").post(verifyAccessToken, leaveController.addLeave)
router.route("/updateLeave/:id").patch(verifyAccessToken, leaveController.updateLeave)
router.route("/deleteLeave/:id").delete(verifyAccessToken, leaveController.deleteLeave)
router.route("/getallLeave").get(verifyAccessToken, leaveController.getAllLeave)
router.route("/getLeave/:id").get(verifyAccessToken, leaveController.getLeave)

export default router