import mongoose from "mongoose";
import IEntity from "./entity";

export interface IPost extends IEntity {
  userId: string;
  breed: string;
  content: string;
  imageURL: string;
  likeBy: string[];
}

const postSchema = new mongoose.Schema<IPost>({
  userId: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  likeBy: {
    type: [String],
    default: [],
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const postModel = mongoose.model<IPost>("Posts", postSchema);

export default postModel;
