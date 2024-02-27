import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  birthday?: mongoose.Schema.Types.Date;
  photoURL?: string;
  email: string;
  password: string;
  _confirmPassword: string;
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
  }, {
    timestamps: true
  });
  

/* Mongoose virtual for 'confirmPassword' field */
UserSchema.virtual('confirmPassword')
.get( function () { return this._confirmPassword})  // getter
.set( function (value: string) { this._confirmPassword = value } ) // setter

/* Before saving, validate by comparing 'password' to 'confirmPassword */
UserSchema.pre('validate', function(next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
})

/* Before saving, convert 'password' to hash with bcrypt */
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10) // bcrypt.hash returns a promise. 10 salt 'rounds'
    .then((hash: string) => { 
      this.password = hash;
      next();
    }); 
  }
);

export default mongoose.model<IUser>("User", UserSchema)