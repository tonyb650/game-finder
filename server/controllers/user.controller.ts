import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  UserModel.create(req.body)
  .then(newUser => res.status(201).json(newUser))
  .catch(err => res.status(400).json(err))
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  UserModel.find({})
  // .populate() // add later
  .then(allUsers => res.status(200).json(allUsers))
  .catch(err => res.status(400).json(err))
}

export default {createUser, getAllUsers}  
/*
require('dotenv').config()

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// TODO const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET // For production/deployment
// TODO const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET // For production/deployment
const REFRESH_TOKEN_SECRET = "secret_key" // For development
const ACCESS_TOKEN_SECRET = "secret_key" // For development

const ACCESS_TOKEN_DURATION = '5m'
const REFRESH_TOKEN_DURATION = '7d'
const REFRESH_COOKIE_MAXAGE = 30*12*60*60*1000

function generateAccessToken(user) {
  const accessToken = jwt.sign({ _id : user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
  return accessToken;
}
function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ _id : user._id }, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_DURATION}); 
  return refreshToken;
}

module.exports = {
  refreshToken : async (req,res) => {
    try {
      const currentUser = await User.findOne({_id : req.body.userId});
      const accessToken = await generateAccessToken(currentUser);
      console.log("Refreshing Access Token")
      res
        .status(201)
        .json({msg: "Refreshed accessToken", user : currentUser, accessToken : accessToken })
    } catch(err) {
      res.status(400).json(err)
    }
  },

  register : async (req,res) => {
    try {
      const possibleUser = await User.findOne({ email : req.body.email })
      if (possibleUser) {
        res.status(400).json({errors: { email : { message : 'This email already exists. Please log in.' }}})
      } else {
        const newUser = await User.create(req.body)
        // *The first value passed into jwt.sign is the 'payload'. This can be retrieved in jwt.verify
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);  
        res
          .status(201)
          .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge : REFRESH_COOKIE_MAXAGE}) 
          .json({msg: "Successful user registration", user : newUser, accessToken : accessToken})
      }
    }
    catch(err) {
      res.status(400).json(err)
    }
  },

  login: async(req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });     // Search for the given email
      if (user === null) {                                            // Email NOT found in 'users' collection
        res.status(400).json({message:"Invalid Credentials"});
      } else {
        const isCorrectPW = await bcrypt.compare(req.body.password, user.password); // compare PW given with PW hash in DB
        if(isCorrectPW) {                                             // Password was a match!
          // *The first value passed into jwt.sign is the 'payload'. This can be retrieved in jwt.verify
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);  
          res
            .status(201)
            .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge : REFRESH_COOKIE_MAXAGE})
            .json({msg: "Successful login", user : user, accessToken : accessToken})
        } else {                                                      // Password was NOT a match
          res.status(400).json({message:"Invalid Credentials"});
        }
      }
    }
    catch(err){
      res.status(400).json(err);
    }
  },
    
  logout: (req, res) => {
    res.clearCookie('refreshToken');
    res.sendStatus(200);                                              // Apparently, this is the equivalent of res.status(200).send('OK')
  },
  
  getCurrentUser: async (req, res) => {
    try{
      const currentUser = await User
        .find({_id : req.body.userId})                         // req.body.userId will come through JWT token
        .populate({path: 'events', populate: { path: 'location', model: "Location"}}); 
      res.status(200).json(currentUser);
    } 
    catch (err){
      res.status(400).json(err);
    }
  },
  
  getUser: async (req, res) => {
    try{
      const oneUser = await User
        .findById({_id : req.params.id})
        .populate({path: 'events', populate: { path: 'location', model: "Location"}}); 
      res.status(200).json(oneUser);
    } 
    catch (err){
      res.status(400).json(err);
    }
  },

  // TODO: this is untested(new) code. Test it out. 
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