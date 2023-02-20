import { Router } from "express";
import { employeeController } from "../controllers/employeeController";
import { departmentController } from "../controllers/departmentController";
import { verifyAccessToken } from "../config/jwtToken";
import { validation } from "../middleware/validation";

const router = Router()

//super admin and hr can add 

router.route("/adddepartment").post(validation.varifyAccessTokenAndSuperAdmin, departmentController.addDepartment)
router.route("/updatedepartment").patch(verifyAccessToken, departmentController.updateDepartment)
router.route("/deletedepartment").delete(verifyAccessToken, departmentController.deleteDepartment)
router.route("/getalldepartment").get(verifyAccessToken, departmentController.getAllDepartment)
router.route("/getdepartment/:id").get(verifyAccessToken, departmentController.getDepartment)

export default router