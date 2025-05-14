import { NextFunction, Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() // loads any environmental variables that we have

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string // For production/deployment
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string // For production/deployment
// const REFRESH_TOKEN_SECRET = "secret_key" // For development
// const ACCESS_TOKEN_SECRET = "secret_key" // For development
const ACCESS_TOKEN_DURATION = '15m'
const REFRESH_TOKEN_DURATION = '7d'
const REFRESH_COOKIE_MAXAGE = 30*12*60*60*1000

function generateAccessToken(user: IUser) {
  const accessToken = jwt.sign({ _id : user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
  return accessToken;
}
function generateRefreshToken(user: IUser) {
  const refreshToken = jwt.sign({ _id : user._id }, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_DURATION}); 
  return refreshToken;
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const oneUser = await UserModel
      .findById({_id : req.params.id})
      .populate({path: 'events', populate: { path: 'location', model: "Location"}}); 
    res.status(200).json(oneUser);
  } 
  catch (err){
    res.status(400).json(err);
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const possibleUser = await UserModel.findOne({ email : req.body.email })
    if (possibleUser) {
      res.status(400).json({errors: { email : { message : 'This email already exists. Please log in.' }}})
    } else {
      const newUser = await UserModel.create(req.body)
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
}

const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('refreshToken')
  res.sendStatus(200)
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = await UserModel.findOne({_id : req.body.userId});
    if(currentUser !== null ){
      const accessToken = generateAccessToken(currentUser);
      console.log("Refreshing Access Token")
      res
      .status(201)
      .json({msg: "Refreshed accessToken", user : currentUser, accessToken : accessToken })
    } else {
      console.error("Error attempting to refresh Access Token")
      throw "Error attempting to refresh Access Token"
    }
  } catch(err) {
    res.status(400).json(err)
  }
}

const login = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });     // Search for the given email
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
}

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const currentUser = await UserModel
      .find({_id : req.body.userId})                         // req.body.userId will come through JWT token
      .populate({path: 'events', populate: { path: 'location', model: "Location"}}); 
    res.status(200).json(currentUser);
  } 
  catch (err){
    res.status(400).json(err);
  }
}

export default { getUserById, register, login, logout, refreshToken, getCurrentUser }  


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