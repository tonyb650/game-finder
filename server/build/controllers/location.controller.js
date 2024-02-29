"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.getAllLocations = void 0;
const location_model_1 = __importDefault(require("../models/location.model"));
function getAllLocations(req, res) {
    location_model_1.default.find({})
        .then(allLocations => res.json(allLocations))
        .catch(err => res.status(400).json(err));
}
exports.getAllLocations = getAllLocations;
function getLocationById(req, res) {
    location_model_1.default.findOne({ _id: req.params.id })
        .then(oneLocation => res.json(oneLocation))
        .catch(err => res.status(400).json(err));
}
exports.getLocationById = getLocationById;
function createLocation(req, res, next) {
    location_model_1.default.create(req.body)
        .then((newLocation) => res.json(newLocation))
        .catch((err) => res.status(400).json(err));
}
exports.createLocation = createLocation;
function updateLocation(req, res, next) {
    location_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedLocation) => res.json(updatedLocation))
        .catch((err) => res.status(400).json(err));
}
exports.updateLocation = updateLocation;
function deleteLocation(req, res, next) {
    location_model_1.default.findOneAndDelete({ _id: req.params.id })
        .then((response) => res.json(response))
        .catch((err) => console.log(err));
}
exports.deleteLocation = deleteLocation;
