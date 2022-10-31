import mongoose from "mongoose";
import { StaffDocument } from "./staff.model";
import { StoryRequestDocument } from "./story.request.model";


export type WriteupPhases = 
  | "writeup" | "revision" | "finalEdit" | "graphics" | "finalization"

export const WRITEUP_PHASES: readonly WriteupPhases[] = ["writeup", "revision", "finalEdit", "graphics", "finalization"] as const

export type WriteupNote = {
  title: string,
  message: string
}

type BaseWriteupContent<T> = {
  phase: T,
  title: string,
  caption: string,
  data: any[],
  isSubmitted: boolean,
  isAccepted: boolean,
  reSubmit: boolean,
  notes?: WriteupNote[]
}

export type WriteupContent<T extends WriteupPhases> = T extends "writeup"? 
  BaseWriteupContent<T> & { submissions?: StaffDocument["_id"][] } :
  BaseWriteupContent<T> & {
    handledBy?: StaffDocument["_id"],
    requestedResubmit: boolean
  }

export type Writeup = {
  request: StoryRequestDocument["_id"],
  writeupId: string,
  banner: any,
  category: string,
  currentPhase: WriteupPhases,
  isPublished: boolean,
  content: [
    WriteupContent<"writeup">,
    WriteupContent<"revision"> | null,
    WriteupContent<"finalEdit"> | null,
    WriteupContent<"graphics"> | null,
    WriteupContent<"finalization"> | null
  ],
}

export type WriteupDocument = Writeup & mongoose.Document<mongoose.Types.ObjectId> & {
  _id: mongoose.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date
};

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
  banner: String,
  category: {
    type: String,
    required: true
  },
  currentPhase: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true
  },
  content: [{
    phase: String,
    title: String,
    caption: String,
    data: [],
    notes: [{
      title: String,
      message: String
    }],
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff"
    },
    submissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff"
    }],
    isSubmitted: {
      type: Boolean,
      default: false
    },
    isAccepted: {
      type: Boolean,
      default: false
    },
    reSubmit: {
      type: Boolean,
      default: false
    },
    requestedResubmit: {
      type: Boolean,
      default: false
    }
  }],
},{ timestamps: true }
)

const WriteupModel: mongoose.Model<WriteupDocument> = mongoose.models.Writeup || mongoose.model<WriteupDocument>("Writeup", writeupSchema);

export { WriteupModel };