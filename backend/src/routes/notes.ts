import { Router } from "express";
import { NoteController } from "../controller/NoteController";
import authMiddleware from "../middleware/authMiddleware";


const router = Router();
const noteController = new NoteController();

// Get all notes
router.get("/", noteController.all);

// Get one note
router.get("/:uuid", noteController.one);

// Create a new note
router.post("/", [authMiddleware], noteController.save);

// Delete one note
router.delete("/:uuid", [authMiddleware], noteController.remove);

export default router;
