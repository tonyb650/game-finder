"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const jwt_config_1 = require("../config/jwt.config");
const messageRouter = (0, express_1.Router)();
messageRouter.get('/api/messages', jwt_config_1.authenticate, message_controller_1.default.getAllMessages);
messageRouter.get('/api/messages/events/:eventId', jwt_config_1.authenticate, message_controller_1.default.getEventMessages);
messageRouter.get('/api/messages/:id', jwt_config_1.authenticate, message_controller_1.default.getMessageById);
messageRouter.post('/api/messages', jwt_config_1.authenticate, message_controller_1.default.createMessage);
messageRouter.patch('/api/messages/:id', jwt_config_1.authenticate, message_controller_1.default.updateMessage);
messageRouter.delete('/api/messages/:id', jwt_config_1.authenticate, message_controller_1.default.deleteMessage);
exports.default = messageRouter;
