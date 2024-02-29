"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_model_1 = __importDefault(require("../models/notification.model"));
const getAllNotifications = (req, res, next) => {
    notification_model_1.default.find({})
        .then((allNotifications) => { res.json(allNotifications); })
        .catch((err) => res.status(400).json(err));
};
const getNotificationById = (req, res, next) => {
    notification_model_1.default.findOne({ _id: req.params.id })
        .then((oneNotification) => res.json(oneNotification))
        .catch((err) => res.status(400).json(err));
};
const getNotificationsByUserId = (req, res, next) => {
    notification_model_1.default.find({ user: req.params.userId })
        .then((usersNotifications) => res.json(usersNotifications))
        .catch((err) => res.status(400).json(err));
};
const createNotification = (req, res, next) => {
    notification_model_1.default.create(req.body)
        .then((newNotification) => res.json(newNotification))
        .catch((err) => res.status(400).json(err));
};
const updateNotification = (req, res, next) => {
    notification_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedNotification) => res.json(updatedNotification))
        .catch((err) => res.status(400).json(err));
};
const deleteNotification = (req, res, next) => {
    notification_model_1.default.findOneAndDelete({ _id: req.params.id })
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
};
exports.default = { getAllNotifications, getNotificationById, getNotificationsByUserId, createNotification, updateNotification, deleteNotification };
