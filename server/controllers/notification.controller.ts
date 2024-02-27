import { NextFunction, Request, Response }  from "express";
import NotificationModel from '../models/notification.model';

const getAllNotifications = (req: Request, res: Response, next: NextFunction) => {
    NotificationModel.find({})
      .then((allNotifications) => {res.json(allNotifications)})
      .catch((err) => res.status(400).json(err));
  }

const getNotificationById = (req: Request, res: Response, next: NextFunction) => {
    NotificationModel.findOne({ _id: req.params.id })
      .then((oneNotification) => res.json(oneNotification))
      .catch((err) => res.status(400).json(err));
  }

const getNotificationsByUserId = (req: Request, res: Response, next: NextFunction) => {
    NotificationModel.find({ user: req.params.userId })
      .then((usersNotifications) => res.json(usersNotifications))
      .catch((err) => res.status(400).json(err));
  }

const createNotification = (req: Request, res: Response, next: NextFunction) => {
    NotificationModel.create(req.body)
      .then((newNotification) => res.json(newNotification))
      .catch((err) => res.status(400).json(err));
  }

const updateNotification = (req: Request, res: Response, next: NextFunction) => {
    NotificationModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedNotification) => res.json(updatedNotification))
      .catch((err) => res.status(400).json(err));
  }

const deleteNotification = (req: Request, res: Response, next: NextFunction) => {
    NotificationModel.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  }

export default { getAllNotifications, getNotificationById, getNotificationsByUserId, createNotification, updateNotification, deleteNotification }
