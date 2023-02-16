import { Router } from "express";
import { employeeController } from "../controllers/employeeController";
import { departmentController } from "../controllers/departmentController";

const router = Router()

router.route("/adddepartment").post(departmentController.addDepartment)
router.route("/updatedepartment").patch(departmentController.updateDepartment)
router.route("/deletedepartment").delete(departmentController.deleteDepartment)
router.route("/getalldepartment").get(departmentController.getAllDepartment)
router.route("/getdepartment/:id").get(departmentController.getDepartment)

export default router