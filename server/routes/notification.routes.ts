import { Router } from 'express'
import  NotificationController from "../controllers/notification.controller";
import { authenticate } from '../config/jwt.config'

const notificationRouter = Router()

  notificationRouter.get("/api/notifications", authenticate, NotificationController.getAllNotifications);
  notificationRouter.get('/api/notifications/user/:userId', authenticate, NotificationController.getNotificationsByUserId);
  notificationRouter.get('/api/notifications/:id', authenticate, NotificationController.getNotificationById);
  notificationRouter.post('/api/notifications', authenticate, NotificationController.createNotification);
  notificationRouter.patch('/api/notifications/:id', authenticate, NotificationController.updateNotification);
  notificationRouter.delete('/api/notifications/:id', authenticate, NotificationController.deleteNotification);

export default notificationRouter;