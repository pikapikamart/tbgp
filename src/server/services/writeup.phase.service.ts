import "../models"
import { 
  DocumentDefinition,
  FilterQuery, 
  UpdateQuery } from "mongoose";
import { 
  WriteupPhase, 
  WriteupPhaseModel } from "../models/writeup.phase.model";


export const createWriteupPhase = async( writeupPhase: DocumentDefinition<WriteupPhase> ) => (
  WriteupPhaseModel.create(writeupPhase)
)

export const updateWriteupPhase = async(
  query: FilterQuery<WriteupPhase>,
  update: UpdateQuery<WriteupPhase>
) => (
  WriteupPhaseModel.findOneAndUpdate(query, update)
)