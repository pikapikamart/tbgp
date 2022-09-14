import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Writeups, 
  WriteupsModel } from "../models/writeups.model";


export const createWriteup = async( writeup: DocumentDefinition<Writeups> ) => (
  WriteupsModel.create(writeup)
)

export const findWriteupPhase = async( phase: DocumentDefinition<Writeups> ) => {

}

export const findWriteup = async( 
  writeupId: FilterQuery<Writeups>,
  projection: ProjectionType<Writeups> = {},
  options: QueryOptions = { lean: true } ) => (
  WriteupsModel.findOne(writeupId, projection, options)
)

export const updateWriteup = async(
  query: FilterQuery<Writeups>,
  update: UpdateQuery<Writeups>
) => (
  WriteupsModel.findOneAndUpdate(query, update)
)