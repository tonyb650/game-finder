import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  firstName: string;
  lastName: string;
  birthday?: mongoose.Schema.Types.Date;
  photoURL?: string;
  checkedMessagesDate?: mongoose.Schema.Types.Date;
  email: string;
  password: string;
  events?: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    birthday: {
      type: String,
      required: [true, "Birthday is required"]
    },
    checkedMessagesDate: {
      type: Date
    },
    photoURL: {
      type: String
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val: string) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }, 
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event"
    }]
  }, {timestamps: true});
  

UserSchema.virtual('confirmPassword')
.get( function ( this: {_confirmPassword: string}) { return this._confirmPassword}) 
.set( function (_confirmPassword:string) { this.set(_confirmPassword)} );

// UserSchema.pre('validate', function(next) {
//   const confirm: string = UserSchema.virtual('confirmPassword')
//   .get( function ( this: {_confirmPassword: string}) { return this._confirmPassword}) 
//   if (this.password !== confirm) {
//     this.invalidate('confirmPassword', 'Password must match confirm password');
//   }
//   next();
// });

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10) // bcrypt.hash returns a promise. 10 salt 'rounds'
    .then((hash: string) => { 
      console.log("hash" + hash)
      this.password = hash;
      next();
    }); 
  }
);

export default mongoose.model<IUser>("User", UserSchema)