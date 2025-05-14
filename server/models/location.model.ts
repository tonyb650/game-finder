import mongoose from 'mongoose';

export interface ILocation {
  _id: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  locationDetails: string;
}

const locationSchema = new mongoose.Schema<ILocation>({
  locationName: {
    type: String,
    required: [ true, "Location name is required"]
},
  address: {
    type: String
},
  city: {
    type: String
},
  state: {
    type: String
},
locationDetails: {type: String
},
}, {timestamps: true})

export default mongoose.model<ILocation>("Location", locationSchema)