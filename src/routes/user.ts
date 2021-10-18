import { Router } from "express";
import { UserController } from "../controller/UserController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

// Get all users
router.get("/", userController.all);

// Get one user
router.get("/:uuid", userController.one);

// Create a new user
router.post("/", userController.save);

// Edit one user
router.patch("/:uuid", [authMiddleware], userController.save);

// Delete one user
router.delete("/:uuid", [authMiddleware], userController.remove);

export default router;
