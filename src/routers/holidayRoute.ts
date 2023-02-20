import { Router } from "express";
import { holidayController } from "../controllers/holidayController";
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

//super admin can add update delete it and also hr 

router.route("/addholiday").post(verifyAccessToken, holidayController.addHoliday)
router.route("/updateholiday").patch(verifyAccessToken, holidayController.updateHoliday)
router.route("/deleteholiday").delete(verifyAccessToken, holidayController.deleteHoliday)
router.route("/getallholiday").get(verifyAccessToken, holidayController.getAllHoliday)
router.route("/getholiday/:id").get(verifyAccessToken, holidayController.getHoliday)

export default router