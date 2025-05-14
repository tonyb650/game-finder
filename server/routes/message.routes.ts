import { Router } from 'express'
import  MessageController from "../controllers/message.controller";
import { authenticate } from '../config/jwt.config'

const messageRouter = Router()

messageRouter.get('/api/messages', authenticate, MessageController.getAllMessages)
messageRouter.get('/api/messages/events/:eventId', authenticate, MessageController.getEventMessages)
messageRouter.get('/api/messages/:id', authenticate, MessageController.getMessageById)
messageRouter.post('/api/messages', authenticate, MessageController.createMessage)
messageRouter.patch('/api/messages/:id', authenticate, MessageController.updateMessage)
messageRouter.delete('/api/messages/:id', authenticate, MessageController.deleteMessage)

export default messageRouter;
