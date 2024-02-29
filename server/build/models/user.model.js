"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    birthday: {
        type: String,
        required: [true, "Birthday is required"]
    },
    photoURL: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    events: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event"
        }]
}, {
    timestamps: true
});
/* Mongoose virtual for 'confirmPassword' field */
UserSchema.virtual('confirmPassword')
    .get(function () { return this._confirmPassword; }) // getter
    .set(function (value) { this._confirmPassword = value; }); // setter
/* Before saving, validate by comparing 'password' to 'confirmPassword */
UserSchema.pre('validate', function (next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
/* Before saving, convert 'password' to hash with bcrypt */
UserSchema.pre('save', function (next) {
    bcrypt_1.default.hash(this.password, 10) // bcrypt.hash returns a promise. 10 salt 'rounds'
        .then((hash) => {
        this.password = hash;
        next();
    });
});
exports.default = mongoose_1.default.model("User", UserSchema);
