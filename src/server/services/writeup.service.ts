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
  WriteupDocument, 
  WriteupModel } from "../models/writeup.model";


export const createWriteup = async( writeup: Writeup ) => (
  WriteupModel.create(writeup)
)

export const updateWriteupService = async(
  query: FilterQuery<Writeup>,
  update: UpdateQuery<Writeup>
) => (
  WriteupModel.findOneAndUpdate(query, update)
)

export const findWriteupService = async(
  query: FilterQuery<Writeup>,
  projection: ProjectionType<Writeup> = "",
  option: QueryOptions = {},
) => (
  WriteupModel.findOne(query, projection, option)
)

export const writeupPopulatorService = async(
  writeup: WriteupDocument,
  populate: PopulateOptions
) => (
  writeup.populate(populate)
)

export const findWriteupPopulatorService = async<T = {},>(
  query: FilterQuery<Writeup>,
  populate: PopulateOptions,
  projection: ProjectionType<Writeup> = "",
  options: QueryOptions = {}
) => (
  WriteupModel.findOne(query, projection, options).populate(populate)
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