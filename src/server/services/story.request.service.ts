import { 
  DocumentDefinition, 
  FilterQuery, 
  PopulateOptions, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  StoryRequest, 
  StoryRequestModel } from "../models/story.request.model";


export const createStoryRequest = async( storyRequest: DocumentDefinition<StoryRequest> ) => (
  StoryRequestModel.create(storyRequest)
)

export const findStoryRequest = async( 
  query: FilterQuery<StoryRequest>,
  projection: ProjectionType<StoryRequest> = "",
  options: QueryOptions = { lean: true },
  populate?: PopulateOptions,
) => (
  populate? StoryRequestModel.findOne(query, projection, options).populate(populate) : StoryRequestModel.findOne(query, projection, options)
)

export const updateStoryRequest = async(
  request: FilterQuery<StoryRequest>,
  update: UpdateQuery<StoryRequest>
) => (
  StoryRequestModel.findOneAndUpdate(request, update)
)

export const deleteStoryRequest = async( request: FilterQuery<StoryRequest> ) => (
  StoryRequestModel.deleteOne(request)
)

// --------Multiple--------

export const findManyStoryRequest = async(
  query: FilterQuery<StoryRequest>,
  projection: ProjectionType<StoryRequest> = "",
  option: QueryOptions
) => (
  StoryRequestModel.find(query, projection, option)
)