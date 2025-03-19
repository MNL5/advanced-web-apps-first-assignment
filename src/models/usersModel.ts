import mongoose from "mongoose";
import IEntity from "./entity";

export interface IUser extends IEntity {
  username: string;
  email: string;
  password: string;
  avatarURL: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    required: false,
  },
  refreshToken: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.model<IUser>("Users", userSchema);

export default userModel;
