import mongoose from "mongoose";
import { StoryRequestDocument } from "./story.request.model";
import { 
  modelComparePassword, 
  preHashModel } from "./model.utils";
import { WriteupDocument } from "./writeup.model";
import { 
  BaseUser, 
  BaseUserDocument, 
  baseUserModel} from "./base.user.model";


export type BastionId = string;

export type StaffDocument = Staff & BaseUserDocument & {};

type StaffPositions = {
  [ key: string ]: string,
  writer: "Writer",
  copyEditor: "Copy Editor",
  editorInChief: "Editor in Chief",
  layoutArtist: "Layout Artist"
}

export const STAFF_POSITIONS: StaffPositions = {
  writer: "Writer",
  copyEditor: "Copy Editor",
  editorInChief: "Editor in Chief",
  layoutArtist: "Layout Artist"
}

export type Staff = BaseUser & {
  firstname: string,
  lastname: string,
  bastionId: BastionId,
  position?: string,
  requests: {
    verification: boolean,
    story: StoryRequestDocument["_id"][]
  },
  storyRequests?: {
    joined: StoryRequestDocument["_id"][],
    created: StoryRequestDocument["_id"][]
  },
  bio?: string,
  writeups?: {
    solo: WriteupDocument["_id"][],
    collaborated: WriteupDocument["_id"][],
    task: WriteupDocument["_id"][]
  }
}

const staffSchema: mongoose.Schema<StaffDocument> = new mongoose.Schema({
  ...baseUserModel,
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
  writeups: {
    solo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writeup"
    }],
    collaborated: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writeup"
    }],
    task: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writeup"
    }]
  }
})

staffSchema.pre("save", preHashModel);

staffSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const StaffModel: mongoose.Model<StaffDocument> = mongoose.models?.Staff || mongoose.model<StaffDocument>("Staff", staffSchema);

export { StaffModel };