"use strict";
exports.__esModule = true;
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.Router();
var authController = new AuthController_1.AuthController();
router.post("/", authController.authenticate);
router.post("/login", [authMiddleware_1["default"]], function (req, res) {
    res.send("Logado");
});
exports["default"] = router;
