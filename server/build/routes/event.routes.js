"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const jwt_config_1 = require("../config/jwt.config");
const eventRouter = (0, express_1.Router)();
eventRouter.get("/api/events", jwt_config_1.authenticate, event_controller_1.default.getAllEvents);
eventRouter.get('/api/events/:id', jwt_config_1.authenticate, event_controller_1.default.getEventById);
eventRouter.post('/api/events', jwt_config_1.authenticate, event_controller_1.default.createEvent);
eventRouter.patch('/api/events/:id', jwt_config_1.authenticate, event_controller_1.default.updateEvent);
eventRouter.delete('/api/events/:id', jwt_config_1.authenticate, event_controller_1.default.deleteEvent);
eventRouter.patch('/api/events/join/:eventId/player/:userId', jwt_config_1.authenticate, event_controller_1.default.joinEvent);
eventRouter.patch('/api/events/drop/:eventId/player/:userId', jwt_config_1.authenticate, event_controller_1.default.dropEvent);
exports.default = eventRouter;
