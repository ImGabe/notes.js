"use strict";
exports.__esModule = true;
var express_1 = require("express");
var NoteController_1 = require("../controller/NoteController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.Router();
var noteController = new NoteController_1.NoteController();
// Get all notes
router.get("/", noteController.all);
// Get one note
router.get("/:uuid", noteController.one);
// Create a new note
router.post("/", [authMiddleware_1["default"]], noteController.save);
// Delete one note
router["delete"]("/:uuid", [authMiddleware_1["default"]], noteController.remove);
exports["default"] = router;
