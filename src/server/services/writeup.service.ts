import "../models"
import { 
  DocumentDefinition, 
  FilterQuery, 
  PopulateOptions, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Writeup, 
  WriteupModel } from "../models/writeup.model";


export const createWriteup = async( writeup: DocumentDefinition<Writeup> ) => (
  WriteupModel.create(writeup)
)

export const updateWriteup = async(
  query: FilterQuery<Writeup>,
  update: UpdateQuery<Writeup>
) => (
  WriteupModel.findOneAndUpdate(query, update)
)

export const findWriteup = async(
  query: FilterQuery<Writeup>,
  populate?: PopulateOptions 
) => (
  populate? WriteupModel.findOne(query).populate(populate) : WriteupModel.findOne(query)
)

// --------Multiple--------

export const findManyWriteup = async(
  query: FilterQuery<Writeup>,
  option: QueryOptions,
  populate?: PopulateOptions
) => (
  populate? WriteupModel.find(query, "", option).populate(populate) : WriteupModel.find(query, "", option)
)