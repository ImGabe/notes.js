import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/", authController.authenticate);

router.post("/login", [authMiddleware], (req, res) => {
  res.send("Logado")
});

export default router;
