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
const message_model_1 = __importDefault(require("../models/message.model"));
const event_model_1 = __importDefault(require("../models/event.model"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const MessageController = {
    getAllMessages: (req, res) => {
        message_model_1.default.find({})
            .populate('author')
            .then(allMessages => res.json(allMessages))
            .catch(err => res.status(400).json(err));
    },
    getEventMessages: (req, res) => {
        message_model_1.default.find({ event: req.params.eventId })
            .populate('author')
            .then(eventMessages => res.json(eventMessages))
            .catch(err => res.status(400).json(err));
    },
    getMessageById: (req, res) => {
        message_model_1.default.findOne({ _id: req.params.id })
            .populate('author')
            .then(oneMessage => res.json(oneMessage))
            .catch(err => res.status(400).json(err));
    },
    createMessage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMessage = yield message_model_1.default.create(req.body); // Create message in DB
            const targetEvent = yield event_model_1.default.findById(req.body.event); // Retrieve associated Event from DB
            if (targetEvent) {
                for (let i = 0; i < targetEvent.players.length; i++) { // Loop through all 'players' in associated Event
                    if (targetEvent.players[i] != req.body.author) { // If the player is not the User who just authored the message, then...
                        const notification = {
                            user: targetEvent.players[i],
                            event: req.body.event,
                            message: newMessage._id
                        };
                        yield notification_model_1.default.create(notification); // ...Create a notification for that player regarding this event & message
                    }
                }
            }
            res.json(newMessage);
        }
        catch (err) {
            console.log("error while attempt to create message in DB");
            res.status(400).json(err);
        }
    }),
    updateMessage: (req, res, next) => {
        message_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedMessage) => res.json(updatedMessage))
            .catch((err) => res.status(400).json(err));
    },
    deleteMessage: (req, res, next) => {
        message_model_1.default.findOneAndDelete({ _id: req.params.id })
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    }
};
exports.default = MessageController;
