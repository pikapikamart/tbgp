import mongoose from "mongoose";
import { BastionId } from "./staff.model";
import { StoryRequestDocument } from "./story.request.model";


export type WriteupPhase = 
  | "writeup" | "revision" | "finalEdit" | "graphics" | "finalizations"

type WriteupContent = {
  [ key in WriteupPhase ]: any[]
}

export type Writeup = {
  request: StoryRequestDocument["_id"],
  writeupId: string,
  title: string,
  caption: string,
  banner: string,
  content: Partial<WriteupContent>,
  isEditingBy: BastionId
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
  content: {
    type: Map,
    of: []
  },
  isEditingBy: String
})