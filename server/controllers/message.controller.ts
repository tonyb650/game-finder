import express from 'express'
import MessageModel from '../models/message.model'
import EventModel from '../models/event.model'
import notificationModel from '../models/notification.model'

const MessageController =  { 
  getAllMessages : (req: express.Request, res: express.Response) => { 
  MessageModel.find({})
  .populate('author')
  .then(allMessages => res.json(allMessages))
  .catch(err => res.status(400).json(err))
  },

  getEventMessages : (req: express.Request, res: express.Response) => { 
    MessageModel.find({ event: req.params.eventId })
    .populate('author')
    .then(eventMessages => res.json(eventMessages))
    .catch(err => res.status(400).json(err))
  },

  getMessageById : (req: express.Request, res: express.Response) => { 
    MessageModel.findOne({ _id: req.params.id })
    .populate('author')
    .then(oneMessage => res.json(oneMessage))
    .catch(err => res.status(400).json(err))
  }, 

  createMessage : async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const newMessage = await MessageModel.create(req.body);         // Create message in DB
      const targetEvent = await EventModel.findById(req.body.event)   // Retrieve associated Event from DB
      if(targetEvent){
        for (let i = 0 ; i < targetEvent.players.length; i++){        // Loop through all 'players' in associated Event
          if (targetEvent.players[i] != req.body.author){             // If the player is not the User who just authored the message, then...
            const notification = {
              user : targetEvent.players[i],
              event : req.body.event,
              message : newMessage._id 
            }
            await notificationModel.create(notification);             // ...Create a notification for that player regarding this event & message
          }
        }
      }
      res.json(newMessage)
    } catch (err){
      console.log("error while attempt to create message in DB")
      res.status(400).json(err)
    }
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
