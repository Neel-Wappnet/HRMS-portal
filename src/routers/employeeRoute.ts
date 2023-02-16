import { Router } from "express";
import { employeeController } from "../controllers/employeeController";

const router = Router()

router.route("/addemployee").post(employeeController.addEmployee)
router.route("/updateemployee").patch(employeeController.updateEmployee)
router.route("/deleteemployee").delete(employeeController.deleteEmployee)
router.route("/getallemployee").get(employeeController.getAllEmployee)
router.route("/getemployee/:id").get(employeeController.getEmployee)

export default router