"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    eventTitle: {
        type: String,
        required: [true, "Event title is required"],
    },
    eventDate: {
        type: Date,
        required: [true, "Event date is required"],
    },
    eventDetails: {
        type: String,
    },
    maxPlayers: {
        type: Number,
        required: [true, "Participant count is required"],
        min: [2, "Event must accommodate at least 2 participants"],
    },
    location: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Location",
        required: [true, "Location is required"],
    },
    creator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"],
    },
    players: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Event", EventSchema);
