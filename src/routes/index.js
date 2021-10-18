"use strict";
exports.__esModule = true;
var express_1 = require("express");
var error_1 = require("typeorm/error");
var auth_1 = require("./auth");
var notes_1 = require("./notes");
var user_1 = require("./user");
var routes = express_1.Router();
function clientErrorHandler(err, req, res, next) {
    // interface ErrExistingField {
    //   error: string,
    //   field: string
    // }
    if (err instanceof error_1.QueryFailedError) {
        var _a = err.driverError.toString().split(': '), code = _a[1], message = _a[2], dbField = _a[3];
        if (code === 'SQLITE_CONSTRAINT' && message === 'UNIQUE constraint failed') {
            var field = dbField.split('.').pop();
            res.json({ error: "already-exists", field: field });
            return;
        }
        if (code === 'SQLITE_CONSTRAINT' && message === 'FOREIGN KEY constraint failed') {
            res.json({ error: "asdsads" });
            return;
        }
    }
    // FIX THIS BEFORE PRODUCTION
    res.json({ error: err });
}
routes.use("/auth", auth_1["default"]);
routes.use("/notes", notes_1["default"]);
routes.use("/users", user_1["default"]);
routes.use(clientErrorHandler);
exports["default"] = routes;
