import { Router } from "express";
import { AuthController } from "../controller/AuthController";


const router = Router();
const authController = new AuthController();

router.post("/login", authController.authenticate);
router.get("/check", authController.check);
router.get("/logout", authController.disauthentication);

export default router;
