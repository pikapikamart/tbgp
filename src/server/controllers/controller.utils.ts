import mongoose, { 
  PopulateOptions,
  ProjectionType,
  QueryOptions} from "mongoose";
import { StaffDocument } from "../models/staff.model";
import { StoryRequest } from "../models/story.request.model";
import { WRITEUP_PHASES } from "../models/writeup.model";
import { BastionIdSchema } from "../schemas/staff.schema";
import { findAdminService } from "../services/admin.service"
import { findStoryRequest } from "../services/story.request.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid"


// --------Admin--------

export const getCurrentAdmin = async() => {
  const foundAdmin = await findAdminService({});

  if ( !foundAdmin ) {
    return trpcError("INTERNAL_SERVER_ERROR", "Admin is still not created")
  }

  return foundAdmin;
}

export const adminValidator = <T,>( admin: T ) => {
  if( !admin ) {
    return trpcError("NOT_FOUND", "Admin not found with this email");
  }

  return admin;
}

// --------Staff--------

export const checkBastionIdExistence = async( bastionId: BastionIdSchema ) => {
  const admin = await getCurrentAdmin();
  const foundBastionId = admin.bastionIds.find(id => id===bastionId);

  if ( !foundBastionId ) {
    return trpcError("NOT_FOUND", "No matching Bastion Id found");
  }
}

export const staffValidator = <T,>( staff: T ) => {
  if ( !staff ) {
    return trpcError("NOT_FOUND", "No staff found with this bastion Id")
  }

  return staff;
}

// --------StoryRequest--------

export const storyRequestValidator = <T,>( story: T ) => {
  if ( !story ) {
    return trpcError("NOT_FOUND", "No story request found with this id")
  }

  return story
}

export const isStoryRequest = ( storyRequest: mongoose.Types.ObjectId | StoryRequest ): storyRequest is StoryRequest => {
  return ( storyRequest as StoryRequest ).storyRequestId!==undefined
}

export const getCurrentAvailableStoryRequest = async( 
  storyRequestId: string,
  projection: ProjectionType<StoryRequest> = "",
  options: QueryOptions = { lean: true },
  populate?: PopulateOptions, 
) =>{
  const foundStoryRequest = storyRequestValidator(await findStoryRequest(
    {
      storyRequestId,
      started: false
    },
    projection,
    options,
    populate
  ))

  return foundStoryRequest;
}

export const getOwnedAvailableStoryRequest = async( storyRequestId: string, owner: StaffDocument["_id"] ) => {
  const foundStoryRequest = await getCurrentAvailableStoryRequest(storyRequestId);

  if ( !foundStoryRequest.owner.equals(owner) ) {
    return trpcError("FORBIDDEN", "Only story request owner can update request")
  }

  return foundStoryRequest;
}

export type WriteupQuery = {
  phase: string,
  writeupId: string
}

// --------Writeup--------

export const writeupValidator = <T,>( story: T ) => {
  if ( !story ) {
    return trpcError("NOT_FOUND", "No writeup found or available")
  }

  return story
}

// -------- Random --------

export const customNanoid = ( length: number ) =>{
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"
  const nanoid = customAlphabet(alphabet)

  return nanoid(length)
}

export const writeupPhaseIndex = ( searchPhase: string ) => {
  const foundIndex =  WRITEUP_PHASES.findIndex(phase => phase===searchPhase)

  if ( foundIndex===-1 ) {
    return trpcError("BAD_REQUEST", "Make sure to send a valid writeup phase")
  } 

  return foundIndex
}