"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // loads any environmental variables that we have
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET; // For production/deployment
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET; // For production/deployment
// const REFRESH_TOKEN_SECRET = "secret_key" // For development
// const ACCESS_TOKEN_SECRET = "secret_key" // For development
const ACCESS_TOKEN_DURATION = '15m';
const REFRESH_TOKEN_DURATION = '7d';
const REFRESH_COOKIE_MAXAGE = 30 * 12 * 60 * 60 * 1000;
function generateAccessToken(user) {
    const accessToken = jwt.sign({ _id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
    return accessToken;
}
function generateRefreshToken(user) {
    const refreshToken = jwt.sign({ _id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });
    return refreshToken;
}
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneUser = yield user_model_1.default
            .findById({ _id: req.params.id })
            .populate({ path: 'events', populate: { path: 'location', model: "Location" } });
        res.status(200).json(oneUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const possibleUser = yield user_model_1.default.findOne({ email: req.body.email });
        if (possibleUser) {
            res.status(400).json({ errors: { email: { message: 'This email already exists. Please log in.' } } });
        }
        else {
            const newUser = yield user_model_1.default.create(req.body);
            // *The first value passed into jwt.sign is the 'payload'. This can be retrieved in jwt.verify
            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);
            res
                .status(201)
                .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: REFRESH_COOKIE_MAXAGE })
                .json({ msg: "Successful user registration", user: newUser, accessToken: accessToken });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const logout = (req, res, next) => {
    res.clearCookie('refreshToken');
    res.sendStatus(200);
};
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_model_1.default.findOne({ _id: req.body.userId });
        if (currentUser !== null) {
            const accessToken = generateAccessToken(currentUser);
            console.log("Refreshing Access Token");
            res
                .status(201)
                .json({ msg: "Refreshed accessToken", user: currentUser, accessToken: accessToken });
        }
        else {
            console.error("Error attempting to refresh Access Token");
            throw "Error attempting to refresh Access Token";
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email }); // Search for the given email
        if (user === null) { // Email NOT found in 'users' collection
            res.status(400).json({ message: "Invalid Credentials" });
        }
        else {
            const isCorrectPW = yield bcrypt_1.default.compare(req.body.password, user.password); // compare PW given with PW hash in DB
            if (isCorrectPW) { // Password was a match!
                // *The first value passed into jwt.sign is the 'payload'. This can be retrieved in jwt.verify
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                res
                    .status(201)
                    .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: REFRESH_COOKIE_MAXAGE })
                    .json({ msg: "Successful login", user: user, accessToken: accessToken });
            }
            else { // Password was NOT a match
                res.status(400).json({ message: "Invalid Credentials" });
            }
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_model_1.default
            .find({ _id: req.body.userId }) // req.body.userId will come through JWT token
            .populate({ path: 'events', populate: { path: 'location', model: "Location" } });
        res.status(200).json(currentUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.default = { getUserById, register, login, logout, refreshToken, getCurrentUser };
/*
updateUser: async (req, res) => {
  try{
      const updatedUser = await User.findOneAndUpdate ({_id : req.body.userId}, req.body, {new:true, runValidators:true}); // req.body.userId coming through JWT
      res.status(200).json(updatedUser);
    }
    catch (err){
      res.status(400).json(err);
    }
  }
}
*/
/* Temporary, for development only
const createUser = (req: Request, res: Response, next: NextFunction) => {
  UserModel.create(req.body)
  .then(newUser => res.status(201).json(newUser))
  .catch(err => res.status(400).json(err))
}
*/
/* Temporary, for development only
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  UserModel.find({})
  .then(allUsers => res.status(200).json(allUsers))
  .catch(err => res.status(400).json(err))
}
*/ 
