"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const locationSchema = new mongoose_1.default.Schema({
    locationName: {
        type: String,
        required: [true, "Location name is required"]
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    locationDetails: { type: String
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Location", locationSchema);
