import { 
  DocumentDefinition, 
  FilterQuery, 
  UpdateQuery} from "mongoose";
import { 
  StoryRequest, 
  StoryRequestModel } from "../models/story.request.model";


export const createStoryRequest = async( storyRequest: DocumentDefinition<StoryRequest> ) => (
  StoryRequestModel.create(storyRequest)
)

export const findStoryRequest = async( request: FilterQuery<StoryRequest> ) => (
  StoryRequestModel.findOne(request)
)

export const updateStoryRequest = async(
  request: FilterQuery<StoryRequest>,
  update: UpdateQuery<StoryRequest>
) => (
  StoryRequestModel.findOneAndUpdate(request, update)
)