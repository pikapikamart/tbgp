import mongoose from "mongoose";
import { 
  WriteupDocument, 
  WriteupPhase, 
  writeupSchema} from "./writeup.model";


export type Writeups = {
  phase: WriteupPhase,
  writings: WriteupDocument[]
}

export type WriteupsDocument = Writeups & mongoose.Document & {
  createdAt: Date,
  updatedAt: Date
}

const writeupsSchema: mongoose.Schema<WriteupsDocument> = new mongoose.Schema({
  phase: {
    type: String,
    required: true
  },
  writings: [writeupSchema]
})

const WriteupsModel: mongoose.Model<WriteupsDocument> = mongoose.models.Writeup || mongoose.model<WriteupsDocument>("Writeup", writeupsSchema);

export { WriteupsModel };