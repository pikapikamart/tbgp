import mongoose from "mongoose";
import { 
  WriteupDocument, 
  WriteupPhases } from "./writeup.model";


export type WriteupPhase = {
  phase: WriteupPhases,
  writeups: WriteupDocument["_id"][]
}

export type WriteupPhaseDocument = WriteupPhase & mongoose.Document & {
  createdAt: Date,
  updatedAt: Date
}

const writeupPhaseSchema: mongoose.Schema<WriteupPhaseDocument> = new mongoose.Schema({
  phase: {
    type: String,
    required: true
  },
  writeups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Writeup"
  }]
})

const WriteupPhaseModel: mongoose.Model<WriteupPhaseDocument> = mongoose.models.WriteupPhase || mongoose.model<WriteupPhaseDocument>("WriteupPhase", writeupPhaseSchema);

export { WriteupPhaseModel };