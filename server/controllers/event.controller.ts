import { NextFunction, Request, Response }  from "express";
import EventModel from '../models/event.model'

const createEvent = (req: Request, res: Response, next: NextFunction) => {
  EventModel.create(req.body)
  .then(newEvent => res.status(201).json(newEvent))
  .catch(err => res.status(400).json(err))
}

const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
  EventModel.find({})
  // .populate() // add later
  .then(allEvents => res.status(200).json(allEvents))
  .catch(err => res.status(400).json(err))
}


const getEventById = (req: Request, res: Response, next: NextFunction) => { 
  EventModel.findOne({ _id: req.params.id })
  // .populate() // add later
  .then(oneEvent => res.json(oneEvent))
  .catch(err => res.status(400).json(err))
}

export default { createEvent, getAllEvents, getEventById }