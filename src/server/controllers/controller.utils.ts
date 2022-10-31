import mongoose, { 
  PopulateOptions,
  ProjectionType,
  QueryOptions} from "mongoose";
import { StaffDocument } from "../models/staff.model";
import { StoryRequest } from "../models/story.request.model";
import {
  WriteupDocument,
  WRITEUP_PHASES } from "../models/writeup.model";
import { BastionIdSchema } from "../schemas/staff.schema";
import { findAdminService } from "../services/admin.service"
import { findStoryRequestService } from "../services/story.request.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid"
import { 
  findWriteupPopulatorService, 
  findWriteupService } from "../services/writeup.service";
import { isContentWriteupPhase } from "./writeup.controller";


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
  const foundStoryRequest = storyRequestValidator(await findStoryRequestService(
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

const writeupSubmissionError = ( writeup: WriteupDocument, phaseIndex: number ) => {
  
  if ( writeup.content[phaseIndex]?.isSubmitted ) {
    return trpcError("CONFLICT", "Writeup is already submitted")
  }

  if ( writeup.content[phaseIndex]?.isAccepted ) {
    return trpcError("CONFLICT", "Writeup is already accepted")
  }
}

export const writeupValidator = <T,>( writeup: T ) => {
  if ( !writeup ) {
    return trpcError("NOT_FOUND", "No writeup found or available")
  }

  return writeup
}

export const writeupSubmissionValidator = ( writeupQuery: WriteupDocument | null ) => {
  const writeup = writeupValidator(writeupQuery)
  const phaseIndex = writeupPhaseIndex(writeup.currentPhase)
  const currentContent = writeup.content[phaseIndex]
  writeupSubmissionError(writeup, phaseIndex)

  if ( !currentContent ) {
    return trpcError("INTERNAL_SERVER_ERROR", "Server error")
  }

  return {
    writeup,
    phaseIndex,
    currentContent
  }
}

export const populateWriteupHelper = async( writeupId: string, staffId: mongoose.Types.ObjectId ) =>{
  const writeup = writeupValidator(await findWriteupPopulatorService<{ request: StoryRequest }>(
    {
      writeupId,
      isPublished: false
    },
    {
      path: "request content.submissions",
      select: "members storyRequestId"
    }
  ))
  
  if ( writeup.request.members.length > 1 && writeup.content[0].submissions?.find(member => member.equals(staffId)) ) {
    return trpcError("FORBIDDEN", "Already submitted your work")
  }
  
  if ( isStoryRequest(writeup.request) && !writeup.request.members.find(member => member.equals(staffId)) ) {
    return trpcError("FORBIDDEN", "Only members of writeup are allowed")  
  }

  writeupSubmissionError((writeup as never) as WriteupDocument , 0)

  return writeup
}

export const findWriteupHelper = async( writeupId: string ) =>{
  const {
    writeup,
    currentContent,
    phaseIndex
  } = writeupSubmissionValidator(await findWriteupService(
    { 
      writeupId,
      isPublished: false
    },
    "", 
    { lean: true })
  )

  if ( isContentWriteupPhase(currentContent) ) {
    return trpcError("CONFLICT", "Can't access lower phase writeups")
  }

  return {
    writeup,
    currentContent,
    phaseIndex
  }
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