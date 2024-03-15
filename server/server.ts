import express from 'express'
import http from 'http'
import locationRouter from './routes/location.routes'
import messageRouter from './routes/message.routes'
import userRouter from './routes/user.routes'
import eventRouter from './routes/event.routes'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import notificationRouter from './routes/notification.routes'
dotenv.config() // loads any environmental variables that we have

const origins = [
  'http://localhost:5173', 
  'https://game-finder-front-end.onrender.com/', 
  'http://game-finder-front-end.onrender.com/', 
  'https://gamefinder.pro/', 
  'http://gamefinder.pro/',
  'https://www.gamefinder.pro/', 
  'http://www.gamefinder.pro/'
]

const app = express()
const port: number = 8000 // Express port

app.use(express.json());
app.use(express.urlencoded({extended:true})); // has to do with bodyParser
app.use(cors({ origin: origins, allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }))
app.use(cookieParser());

require("./config/mongoose.config"); // start database connection here

/** Healthcheck */
app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong'}))

/** API routes */
app.use(locationRouter)
app.use(messageRouter)
app.use(userRouter)
app.use(eventRouter)
app.use(notificationRouter)

app.listen(port, ()=> console.log(`Express is listening on port: ${port}`))
