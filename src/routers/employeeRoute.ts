import { Router } from "express";
import { employeeController } from "../controllers/employeeController";
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

router.route("/addemployee").post(verifyAccessToken, employeeController.addEmployee)
router.route("/updateemployee").patch(verifyAccessToken, employeeController.updateEmployee)
router.route("/deleteemployee").delete(verifyAccessToken, employeeController.deleteEmployee)
router.route("/getallemployee").get(verifyAccessToken, employeeController.getAllEmployee)
router.route("/getemployee/:id").get(verifyAccessToken, employeeController.getEmployee)

export default router