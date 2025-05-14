import { Router } from 'express'
import * as LocationController from "../controllers/location.controller";
import { authenticate } from '../config/jwt.config'

const locationRouter = Router()

locationRouter.get('/api/locations', authenticate, LocationController.getAllLocations)
locationRouter.get('/api/locations/:id', authenticate, LocationController.getLocationById)
locationRouter.post('/api/locations', authenticate, LocationController.createLocation)
locationRouter.patch('/api/locations/:id', authenticate, LocationController.updateLocation)
locationRouter.delete('/api/locations/:id', authenticate, LocationController.deleteLocation)

export default locationRouter;