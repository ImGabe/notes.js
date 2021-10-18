"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
function authMiddleware(request, response, next) {
    var authorization = request.headers.authorization;
    if (!authorization) {
        return response.sendStatus(401);
    }
    var token = authorization.replace('Bearer', '').trim();
    try {
        var data = jwt.verify(token, 'secret');
        var id = data.id;
        request.userID = id;
        return next();
    }
    catch (_a) {
        return response.sendStatus(401);
    }
}
exports["default"] = authMiddleware;
