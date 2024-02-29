"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../models/event.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllEvents = (req, res, next) => {
    event_model_1.default.find({})
        .populate('players')
        .populate('location')
        .populate('creator')
        .then(allEvents => res.status(200).json(allEvents))
        .catch(err => res.status(400).json(err));
};
const getEventById = (req, res, next) => {
    event_model_1.default.findOne({ _id: req.params.id })
        .populate('players')
        .populate('location')
        .populate('creator')
        .then(oneEvent => res.json(oneEvent))
        .catch(err => res.status(400).json(err));
};
const createEvent = (req, res, next) => {
    event_model_1.default.create(req.body)
        .then(newEvent => res.status(201).json(newEvent))
        .catch(err => res.status(400).json(err));
};
const updateEvent = (req, res, next) => {
    event_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    })
        .then(updatedEvent => res.status(200).json(updatedEvent))
        .catch(err => res.status(400).json(err));
};
const deleteEvent = (req, res, next) => {
    event_model_1.default.findOneAndDelete({ _id: req.params.id })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err));
};
const joinEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const userId = req.params.userId;
        const updatedEvent = yield event_model_1.default.findByIdAndUpdate(eventId, { $push: { players: userId } }, { new: true, useFindAndModify: false });
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { $push: { events: eventId } }, { new: true, useFindAndModify: false });
        res.json(updatedEvent);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const dropEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const userId = req.params.userId;
        const updatedEvent = yield event_model_1.default.findByIdAndUpdate(eventId, { $pull: { players: userId } }, { new: true, useFindAndModify: false });
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { $pull: { events: eventId } }, { new: true, useFindAndModify: false });
        res.json(updatedEvent);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.default = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, joinEvent, dropEvent };
