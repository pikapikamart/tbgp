import mongoose from "mongoose";
import { StoryRequestSchema } from "../schema/story.request.schema";
import { StaffDocument } from "./staff.model";


export const CATEGORIES: { [key: string]: string } = {
  sports: "Sports",
  education: "Education",
  devCom: "DevCom",
  literary: "Literary",
  news: "News"
}

export type StoryRequest = StoryRequestSchema & {
  owner: StaffDocument["_id"],
  members: StaffDocument["_id"][],
  requests: StaffDocument["_id"][]
}

export type StoryRequestDocument = StoryRequest & mongoose.Document & {}

const requestStorySchema: mongoose.Schema<StoryRequestDocument> = new mongoose.Schema({
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
  }]
})

const StoryRequestModel: mongoose.Model<StoryRequestDocument> = mongoose.models.StoryRequest || mongoose.model("StoryRequest", requestStorySchema);

export { StoryRequestModel };
