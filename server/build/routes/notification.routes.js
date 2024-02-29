"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = __importDefault(require("../controllers/notification.controller"));
const jwt_config_1 = require("../config/jwt.config");
const notificationRouter = (0, express_1.Router)();
notificationRouter.get("/api/notifications", jwt_config_1.authenticate, notification_controller_1.default.getAllNotifications);
notificationRouter.get('/api/notifications/user/:userId', jwt_config_1.authenticate, notification_controller_1.default.getNotificationsByUserId);
notificationRouter.get('/api/notifications/:id', jwt_config_1.authenticate, notification_controller_1.default.getNotificationById);
notificationRouter.post('/api/notifications', jwt_config_1.authenticate, notification_controller_1.default.createNotification);
notificationRouter.patch('/api/notifications/:id', jwt_config_1.authenticate, notification_controller_1.default.updateNotification);
notificationRouter.delete('/api/notifications/:id', jwt_config_1.authenticate, notification_controller_1.default.deleteNotification);
exports.default = notificationRouter;
