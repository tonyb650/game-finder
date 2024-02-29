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

const app = express()
const port: number = 8000 // Express port

app.use(express.json());
app.use(express.urlencoded({extended:true})); // has to do with bodyParser
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());

require("./config/mongoose.config"); // start database connection here

app.use(locationRouter)
app.use(messageRouter)
app.use(userRouter)
app.use(eventRouter)
app.use(notificationRouter)

app.listen(port, ()=> console.log(`Express is listening on port: ${port}`))
