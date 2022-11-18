import mongoose from "mongoose";
import { ModifyType } from "types/utils";
import { 
  StoryRequestSchema } from "../schemas/story.request.schema";
import { StaffDocument } from "./staff.model";


type CategoriesIndex = {
  [ key: string ]: string
}

export const storyCategories: CategoriesIndex = {
  news: "News",
  editorial: "Editorial",
  opinions: "Opinions",
  features: "Features",
  literary: "Literary",
  devComm: "DevComm",
  sports: "Sports",
  education: "Education",
}

export type StoryRequest = ModifyType<StoryRequestSchema, {
  assignedMembers: StaffDocument["_id"][] | null
}> & {
  storyRequestId: string,
  owner: StaffDocument["_id"],
  started: boolean,
  members: StaffDocument["_id"][],
  requests: StaffDocument["_id"][],
  writeupId: string | null
}

export type StoryRequestDocument = StoryRequest & mongoose.Document<mongoose.Types.ObjectId> & {
  _id: mongoose.Types.ObjectId,
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
  assignedMembers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff"
    }],
    default: null
  },
  started: Boolean,
  writeupId: {
    type: String,
    default: null
  }
},{ timestamps: true }
)

const StoryRequestModel: mongoose.Model<StoryRequestDocument> = mongoose.models.StoryRequest || mongoose.model("StoryRequest", storyRequestSchema);

export { StoryRequestModel };
