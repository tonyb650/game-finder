import { Router } from 'express'
import  MessageController from "../controllers/message.controller";
// const { authenticate } = require('../config/jwt.config');

const messageRouter = Router()

messageRouter.get('/api/messages', MessageController.getAllMessages)
messageRouter.get('/api/messages/:id', MessageController.getMessageById)
messageRouter.post('/api/messages', MessageController.createMessage)
messageRouter.patch('/api/messages/:id', MessageController.updateMessage)
messageRouter.delete('/api/messages/:id', MessageController.deleteMessage)

export default messageRouter;
