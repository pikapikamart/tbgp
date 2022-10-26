import "../models"
import { 
  FilterQuery, 
  PipelineStage, 
  PopulateOptions, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Writeup, 
  WriteupModel } from "../models/writeup.model";


export const createWriteup = async( writeup: Writeup ) => (
  WriteupModel.create(writeup)
)

export const updateWriteup = async(
  query: FilterQuery<Writeup>,
  update: UpdateQuery<Writeup>
) => (
  WriteupModel.findOneAndUpdate(query, update)
)

export const findWriteupService = async(
  query: FilterQuery<Writeup>,
  populate?: PopulateOptions 
) => (
  populate? WriteupModel.findOne(query).populate(populate) : WriteupModel.findOne(query)
)

// --------Multiple--------

export const findMultipleWriteupService = async(
  query: FilterQuery<Writeup>,
  projection: ProjectionType<Writeup> = "",
  option: QueryOptions,
  populate?: PopulateOptions
) => (
  populate? WriteupModel.find(query, projection, option).populate(populate) : WriteupModel.find(query, projection, option)
)

export const findMultipleWriteupAggregator = async( aggregate: PipelineStage[] ) => (
  WriteupModel.aggregate(aggregate)
)