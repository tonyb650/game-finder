"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const jwt_config_1 = require("../config/jwt.config");
const userRouter = (0, express_1.Router)();
userRouter.get("/api/users", jwt_config_1.authenticate, user_controller_1.default.getCurrentUser);
userRouter.get("/api/users/:id", user_controller_1.default.getUserById);
userRouter.get("/api/refresh", jwt_config_1.authenticateRefresh, user_controller_1.default.refreshToken);
userRouter.post("/api/register", user_controller_1.default.register);
userRouter.post("/api/login", user_controller_1.default.login);
userRouter.post("/api/logout", user_controller_1.default.logout);
// userRouter.patch("/api/users/:id", UserController.updateUser);
exports.default = userRouter;
