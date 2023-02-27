import { Router } from "express";
import { departmentController } from "../controllers/departmentController";
import { verifyAccessToken } from "../config/jwtToken";
import { validation } from "../middleware/validation";

const router = Router()

router.route("/adddepartment").post(verifyAccessToken, validation.superAdmin, departmentController.addDepartment)
router.route("/updatedepartment/:id").put(verifyAccessToken, validation.superAdmin, departmentController.updateDepartment)
router.route("/deletedepartment/:id").delete(verifyAccessToken, validation.superAdmin, departmentController.deleteDepartment)
router.route("/getalldepartment").get(verifyAccessToken, departmentController.getAllDepartment)
router.route("/getdepartment/:id").get(verifyAccessToken, departmentController.getDepartment)

export default router