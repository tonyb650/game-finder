import { NextFunction, Request, Response }  from "express";
import EventModel from '../models/event.model'
import UserModel from "../models/user.model";

const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
  EventModel.find({})
  .populate('players')
  .populate('location')
  .populate('creator')
  .then(allEvents => res.status(200).json(allEvents))
  .catch(err => res.status(400).json(err))
}

const getEventById = (req: Request, res: Response, next: NextFunction) => { 
  EventModel.findOne({ _id: req.params.id })
  .populate('players')
  .populate('location')
  .populate('creator')
  .then(oneEvent => res.json(oneEvent))
  .catch(err => res.status(400).json(err))
}

const createEvent = (req: Request, res: Response, next: NextFunction) => {
  EventModel.create(req.body)
  .then(newEvent => res.status(201).json(newEvent))
  .catch(err => res.status(400).json(err))
}

const updateEvent = (req: Request, res: Response, next: NextFunction) => {
  EventModel.findOneAndUpdate({_id: req.params.id}, req.body,{
    new: true,
    runValidators: true
  })
  .then(updatedEvent => res.status(200).json(updatedEvent))
  .catch(err => res.status(400).json(err))
}

const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
  EventModel.findOneAndDelete({ _id: req.params.id})
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json(err))
}

const joinEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;
      const updatedEvent = await EventModel.findByIdAndUpdate(
        eventId,
        { $push: { players: userId } },
        { new: true, useFindAndModify: false }
      );
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { events: eventId } },
        { new: true, useFindAndModify: false }
      );
      res.json(updatedEvent);
    } catch (err) {
      res.status(400).json(err);
    }
  }

const dropEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;
      const updatedEvent = await EventModel.findByIdAndUpdate(
        eventId,
        { $pull: { players: userId } },
        { new: true, useFindAndModify: false }
      );
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { events: eventId } },
        { new: true, useFindAndModify: false }
      );
      res.json(updatedEvent);
    } catch (err) {
      res.status(400).json(err);
    }
  }

export default { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, joinEvent, dropEvent }