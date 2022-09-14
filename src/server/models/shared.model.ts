import mongoose from "mongoose";
import { StoryRequestDocument } from "./story.request.model";


export type User = {
  email: string,
  password: string
}

export type UserDocument = User & mongoose.Document & {
  comparePassword: ( pasword: string ) => Promise<boolean>
}

export const userBaseModel = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}

export type WriteupPhase = {
  writeup: "Write Up",
  revision: "Revision",
  finalEdit: "Final Edit",
  graphics: "Graphics",
  finalization: "Finalization"
}

export type Writeup = {
  request: StoryRequestDocument["_id"],
  writeupId: string,
  title: string,
  caption: string,
  banner: string,
  content: any[],
  isEditing?: boolean
}

export type WriteupDocument = Writeup & mongoose.Document & {};

export const writeupSchema: mongoose.Schema<WriteupDocument> = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoryRequest"
  },
  writeupId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  caption: String,
  banner: String,
  content: [],
  isEditing: Boolean
})