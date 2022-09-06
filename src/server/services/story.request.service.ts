import { 
  DocumentDefinition, 
  FilterQuery } from "mongoose";
import { 
  StoryRequest, 
  StoryRequestModel } from "../models/story.request.model";


export const createStoryRequest = async( storyRequest: DocumentDefinition<StoryRequest> ) => (
  StoryRequestModel.create(storyRequest)
)

export const findStoryRequest = async( request: FilterQuery<StoryRequest> ) => (
  StoryRequestModel.findOne(request)
)