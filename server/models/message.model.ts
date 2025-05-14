import mongoose from 'mongoose'

export interface IMessage {
  _id: string;
  messageContent: string;
  author: mongoose.Schema.Types.ObjectId;
  event: mongoose.Schema.Types.ObjectId;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  messageContent: {type: String,
      required: [true, "Message content is required"],
      minlength: [1, "Insufficient message length"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Author is required for every message"]
  }, 
  event: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event",
    required: [true, "Event is required for every message"]
  }, 
}, {timestamps: true})

export default mongoose.model<IMessage>("Message", MessageSchema)