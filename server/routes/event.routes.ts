import { Router } from "express";
import EventController from '../controllers/event.controller'
import { authenticate } from '../config/jwt.config'

const eventRouter = Router()

    eventRouter.get("/api/events", authenticate, EventController.getAllEvents);
    eventRouter.get('/api/events/:id', authenticate, EventController.getEventById);
    eventRouter.post('/api/events', authenticate, EventController.createEvent);
    eventRouter.patch('/api/events/:id', authenticate, EventController.updateEvent);
    eventRouter.delete('/api/events/:id', authenticate, EventController.deleteEvent);
    eventRouter.patch('/api/events/join/:eventId/player/:userId', authenticate, EventController.joinEvent)
    eventRouter.patch('/api/events/drop/:eventId/player/:userId', authenticate, EventController.dropEvent)

export default eventRouter