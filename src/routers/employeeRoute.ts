import { Router } from "express";
import { employeeController } from "../controllers/employeeController";
import { verifyAccessToken } from "../config/jwtToken";
import { validation } from "../middleware/validation";
import { upload } from "../config/multer";
const imageUpload = upload.single('profileImage')

const router = Router()

//only super admin can add and update it

router.route("/addemployee").post(verifyAccessToken, validation.superAdmin, upload.single('profileImage'), employeeController.addEmployee)
router.route("/updateemployee/:id").put(verifyAccessToken, validation.superAdmin, upload.single('profileImage'), employeeController.updateEmployee)
router.route("/deleteemployee/:id").delete(verifyAccessToken, validation.superAdmin, employeeController.deleteEmployee)
router.route("/getallemployee").get(verifyAccessToken, validation.superAdmin, employeeController.getAllEmployee)
router.route("/getemployee/:id").get(verifyAccessToken, employeeController.getEmployee)

export default router