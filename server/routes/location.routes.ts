import { Router } from 'express'
import * as LocationController from "../controllers/location.controller";

const locationRouter = Router()

locationRouter.get('/api/locations', LocationController.getAllLocations)
locationRouter.get('/api/locations/:id', LocationController.getLocationById)
locationRouter.post('/api/locations', LocationController.createLocation)
locationRouter.patch('/api/locations/:id', LocationController.updateLocation)
locationRouter.delete('/api/locations/:id', LocationController.deleteLocation)

export default locationRouter;

// const { authenticate } = require('../config/jwt.config');

// module.exports = app => {
//     app.get("/api/locations", authenticate, LocationController.getAllLocations);
//     app.get('/api/locations/:id', authenticate, LocationController.getLocationById);
//     app.post('/api/locations', authenticate, LocationController.createLocation);
//     app.patch('/api/locations/:id', authenticate, LocationController.updateLocation);
//     app.delete('/api/locations/:id', authenticate, LocationController.deleteLocation);
// }

