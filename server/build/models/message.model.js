"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    messageContent: { type: String,
        required: [true, "Message content is required"],
        minlength: [1, "Insufficient message length"]
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required for every message"]
    },
    event: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Event is required for every message"]
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Message", MessageSchema);
