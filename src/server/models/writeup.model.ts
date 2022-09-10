import mongoose from "mongoose";
import { StoryRequestDocument } from "./story.request.model";


type WriteupPhase = {
  [ key: string ]: string,
  writeup: "Write Up",
  revision: "Revision",
  finalEdit: "Final Edit",
  graphics: "Graphics",
  finalization: "Finalization"
}

export const WRITEUP_PHASE: WriteupPhase = {
  writeup: "Write Up",
  revision: "Revision",
  finalEdit: "Final Edit",
  graphics: "Graphics",
  finalization: "Finalization"
}

export type Writeup = {
  request: StoryRequestDocument["_id"],
  title: string,
  caption: string,
  banner: string,
  content: any[],
  phase: string
}

export type WriteupDocument = Writeup & mongoose.Document & {
  createdAt: Date,
  updatedAt: Date
}

const writeupSchema: mongoose.Schema<WriteupDocument> = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoryRequest"
  },
  title: {
    type: String,
    required: true
  },
  caption: String,
  banner: String,
  content: [],
  phase: {
    type: String,
    required: true
  }
})

const WriteupModel: mongoose.Model<WriteupDocument> = mongoose.models.Writeup || mongoose.model<WriteupDocument>("Writeup", writeupSchema);

export { WriteupModel };