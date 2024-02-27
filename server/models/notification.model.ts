import mongoose from "mongoose";

export interface INotification {
  _id: string;
  event: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  message: mongoose.Schema.Types.ObjectId;
}

const NotificationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event"
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  }, 
  message: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Message"
  }
}, {timestamps: true})

export default mongoose.model<INotification>("Notification", NotificationSchema)