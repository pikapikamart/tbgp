import { 
  DocumentDefinition, 
  FilterQuery, 
  PopulateOptions, 
  ProjectionType, 
  UpdateQuery} from "mongoose";
import { 
  Writeups, 
  WriteupsModel } from "../models/writeups.model";


export const createWriteup = async( writeup: DocumentDefinition<Writeups> ) => (
  WriteupsModel.create(writeup)
)

export const updateWriteup = async(
  query: FilterQuery<Writeups>,
  update: UpdateQuery<Writeups>
) => (
  WriteupsModel.findOneAndUpdate(query, update)
)

export const findWriteup = async(
  query: FilterQuery<Writeups>,
  projection: ProjectionType<Writeups> = "",
  populate?: PopulateOptions 
) => (
  populate? WriteupsModel.findOne(query, projection).populate(populate) : WriteupsModel.findOne(query, projection)
)