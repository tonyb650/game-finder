import express from 'express'
import LocationModel from '../models/location.model'

export function getAllLocations (req: express.Request, res: express.Response) { 
  LocationModel.find({})
  .then(allLocations => res.json(allLocations))
  .catch(err => res.status(400).json(err))
} 

export function getLocationById (req: express.Request, res: express.Response) { 
  LocationModel.findOne({ _id: req.params.id })
  .then(oneLocation => res.json(oneLocation))
  .catch(err => res.status(400).json(err))
} 

export function createLocation (req: express.Request, res: express.Response, next: express.NextFunction) {
  LocationModel.create(req.body)
    .then((newLocation) => res.json(newLocation))
    .catch((err) => res.status(400).json(err));
}

export function updateLocation (req: express.Request, res: express.Response, next: express.NextFunction) {
  LocationModel.findOneAndUpdate({ _id: req.params.id }, req.body, 
    {
    new: true,
    runValidators: true,
  }
  )
    .then((updatedLocation) => res.json(updatedLocation))
    .catch((err) => res.status(400).json(err));
}

export function deleteLocation (req: express.Request, res: express.Response, next: express.NextFunction) {
  LocationModel.findOneAndDelete({ _id: req.params.id })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
}