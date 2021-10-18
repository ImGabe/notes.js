"use strict";
exports.__esModule = true;
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.Router();
var userController = new UserController_1.UserController();
// Get all users
router.get("/", userController.all);
// Get one user
router.get("/:uuid", userController.one);
// Create a new user
router.post("/", userController.save);
// Edit one user
router.patch("/:uuid", [authMiddleware_1["default"]], userController.save);
// Delete one user
router["delete"]("/:uuid", [authMiddleware_1["default"]], userController.remove);
exports["default"] = router;
