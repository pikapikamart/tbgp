import { 
  DocumentDefinition, 
  FilterQuery, 
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
  request: FilterQuery<StoryRequest>,
  projection: ProjectionType<StoryRequest> = {},
  options: QueryOptions = { lean: true }
) => (
  StoryRequestModel.findOne(request, projection, options)
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