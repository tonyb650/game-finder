import { NextFunction, Request, Response }  from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() // loads any environmental variables that we have

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string // For production/deployment
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string // For production/deployment
// const REFRESH_TOKEN_SECRET = "secret_key"; // For development
// const ACCESS_TOKEN_SECRET = "secret_key"; // For development

interface UserPayload {
  _id: string
}

/* This file is our 'middleware' 
  Every time our express server uses get, post, patch, etc.,
  we include the below function to *authenticate* the token that is
  in the cookie as part of the request coming from the front end.
  If authentication is successful, this function finishes with 'next()'
  which executes the .then() immediately following sending the request
  to the server
  */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = jwt.verify(req.headers['authorization']?.split(" ")[1] as string, ACCESS_TOKEN_SECRET) as UserPayload
    req.body.userId = payload._id
    next();
  } catch (err) {
    console.log("Access token auth failed or expired within jwt.config.js")
    res.status(403).json({ verified: false });
  }
};

/* This verifies the *refresh token* (when it is time update the access token)  */
const authenticateRefresh = (req: Request, res: Response, next: NextFunction) => { // Refresh token is received in httpOnly cookie that comes with every axios request where { credentials: true }
  try {
    const payload = jwt.verify(req.cookies.refreshToken, REFRESH_TOKEN_SECRET) as UserPayload
    req.body.userId = payload._id
    next();

  } catch (err){
    console.log("Refresh token auth failed or expired within jwt.config.js")
    console.error(err)
    res.status(403).json({ verified: false });
  }
}

export { authenticate, authenticateRefresh }