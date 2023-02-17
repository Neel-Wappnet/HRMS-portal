import { Router } from "express";
import { employeeController } from "../controllers/employeeController";
import { departmentController } from "../controllers/departmentController";
import { verifyAccessToken } from "../config/jwtToken";

const router = Router()

router.route("/adddepartment").post(verifyAccessToken, departmentController.addDepartment)
router.route("/updatedepartment").patch(verifyAccessToken, departmentController.updateDepartment)
router.route("/deletedepartment").delete(verifyAccessToken, departmentController.deleteDepartment)
router.route("/getalldepartment").get(verifyAccessToken, departmentController.getAllDepartment)
router.route("/getdepartment/:id").get(verifyAccessToken, departmentController.getDepartment)

export default router