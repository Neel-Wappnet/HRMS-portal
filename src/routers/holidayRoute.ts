import { Router } from "express";
import { holidayController } from "../controllers/holidayController";
import { verifyAccessToken } from "../config/jwtToken";
import { validation } from "../middleware/validation";

const router = Router()

router.route("/addholiday").post(verifyAccessToken, validation.superAdmin, holidayController.addHoliday)
router.route("/updateholiday/:id").put(verifyAccessToken, validation.superAdmin, holidayController.updateHoliday)
router.route("/deleteholiday/:id").delete(verifyAccessToken, validation.superAdmin, holidayController.deleteHoliday)
router.route("/getallholiday").get(verifyAccessToken, holidayController.getAllHoliday)
router.route("/getholiday/:id").get(verifyAccessToken, holidayController.getHoliday)

export default router