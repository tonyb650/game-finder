import { Router } from "express";
import EventController from '../controllers/event.controller'
// const { authenticate } = require('../config/jwt.config');

const eventRouter = Router()

    eventRouter.get("/api/events", EventController.getAllEvents);
    eventRouter.get('/api/events/:id', EventController.getEventById);
    eventRouter.post('/api/events', EventController.createEvent);
    // eventRouter.patch('/api/events/:id', EventController.updateEvent);
    // eventRouter.delete('/api/events/:id', EventController.deleteEvent);
    // eventRouter.patch('/api/events/join/:eventId/player/:userId', EventController.joinEvent)
    // eventRouter.patch('/api/events/drop/:eventId/player/:userId', EventController.dropEvent)

export default eventRouter