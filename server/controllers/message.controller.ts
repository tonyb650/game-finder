import express from 'express'
import MessageModel from '../models/message.model'

const MessageController =  { 
  getAllMessages : (req: express.Request, res: express.Response) => { 
  MessageModel.find({})
  .then(allMessages => res.json(allMessages))
  .catch(err => res.status(400).json(err))
  },

  getMessageById : (req: express.Request, res: express.Response) => { 
   MessageModel.findOne({ _id: req.params.id })
   .then(oneMessage => res.json(oneMessage))
   .catch(err => res.status(400).json(err))
 }, 
 
 createMessage : (req: express.Request, res: express.Response, next: express.NextFunction) => {
   MessageModel.create(req.body)
   .then((newMessage) => res.json(newMessage))
   .catch((err) => res.status(400).json(err));
  },
  
  updateMessage : (req: express.Request, res: express.Response, next: express.NextFunction) => {
    MessageModel.findOneAndUpdate({ _id: req.params.id }, req.body, 
      {
      new: true,
      runValidators: true,
    }
    )
      .then((updatedMessage) => res.json(updatedMessage))
      .catch((err) => res.status(400).json(err));
  },

  deleteMessage : (req: express.Request, res: express.Response, next: express.NextFunction) => {
    MessageModel.findOneAndDelete({ _id: req.params.id })
      .then((response) => res.json(response))
      .catch((err) => console.log(err));
  }
}

export default MessageController
