import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User =
  mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);

export default User;
