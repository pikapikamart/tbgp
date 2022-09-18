import mongoose from "mongoose";
import { 
  StoryRequestSchema } from "../schemas/story.request.schema";
import { StaffDocument } from "./staff.model";


type Categories = {
  [ key: string ]: string,
  sports: "Sports",
  education: "Education",
  devCom: "DevCom",
  literary: "Literary",
  news: "News"
}

export const CATEGORIES: Categories = {
  sports: "Sports",
  education: "Education",
  devCom: "DevCom",
  literary: "Literary",
  news: "News"
}

export type StoryRequest = StoryRequestSchema & {
  storyRequestId: string,
  owner: StaffDocument["_id"],
  started: boolean
  members: StaffDocument["_id"][],
  requests: StaffDocument["_id"][],
}

export type StoryRequestDocument = StoryRequest & mongoose.Document & {
  createdAt: Date
}

export const storyRequestSchema: mongoose.Schema<StoryRequestDocument> = new mongoose.Schema({
  storyRequestId: {
    type: String,
    unique: true,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff"
  }],
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff"
  }],
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  instruction: {
    type: String,
    required: true
  },
  assignedMembers: [{
    type: String,
    ref: "Staff"
  }],
  started: Boolean
},{ timestamps: true }
)

const StoryRequestModel: mongoose.Model<StoryRequestDocument> = mongoose.models.StoryRequest || mongoose.model("StoryRequest", storyRequestSchema);

export { StoryRequestModel };
