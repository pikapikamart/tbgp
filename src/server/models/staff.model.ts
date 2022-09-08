import mongoose from "mongoose";
import { StaffSchema } from "../schema/staff.schema";
import { StoryRequestDocument } from "./story.request.model";
import { 
  userBaseModel, 
  UserDocument } from "./user.model";
import { 
  modelComparePassword, 
  preHashModel } from "./model.utils";


export const STAFF_POSITIONS: { [ key: string ]: string } = {
  writer: "Writer",
  copyEditor: "Copy editor",
  editorInChief: "Editor in chief",
  layoutArtist: "Layout artist"
}
 
export type Staff = StaffSchema & {
  requests: {
    verification: boolean,
    story: StoryRequestDocument["_id"][]
  },
  position?: string,
  storyRequests?: {
    joined: StoryRequestDocument["_id"][],
    created: StoryRequestDocument["_id"][]
  },
  bio?: string,
}

export type StaffDocument = Staff & UserDocument & {};

const staffSchema: mongoose.Schema<StaffDocument> = new mongoose.Schema({
  ...userBaseModel,
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  bastionId: {
    type: String,
    required: true
  },
  requests: {
    verification: Boolean,
    story: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoryRequest"
    }]
  },
  position: String,
  storyRequests: {
    joined: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "StoryRequest"
    }],
    created: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "StoryRequest"
    }]
  },
  bio: String,
})

staffSchema.pre("save", preHashModel);

staffSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const StaffModel: mongoose.Model<StaffDocument> = mongoose.models?.Staff || mongoose.model<StaffDocument>("Staff", staffSchema);

export { StaffModel };