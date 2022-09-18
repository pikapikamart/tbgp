import { 
  FilterQuery, 
  PopulateOptions,
  ProjectionType,
  QueryOptions} from "mongoose";
import { StaffDocument } from "../models/staff.model";
import { 
  StoryRequest, 
  StoryRequestDocument } from "../models/story.request.model";
import { Writeup } from "../models/writeup.model";
import { BastionIdSchema } from "../schemas/staff.schema";
import { getAdmin } from "../services/admin.service"
import { findStoryRequest } from "../services/story.request.service";
import { findWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";


export const getCurrentAdmin = async() => {
  const foundAdmin = await getAdmin();

  if ( !foundAdmin ) {
    return trpcError("INTERNAL_SERVER_ERROR", "Admin is still not created")
  }

  return foundAdmin;
}

export const checkBastionIdExistence = async( bastionId: BastionIdSchema ) => {
  const admin = await getCurrentAdmin();
  const foundBastionId = admin.bastionIds.find(id => id===bastionId);

  if ( !foundBastionId ) {
    return trpcError("NOT_FOUND", "No matching Bastion Id found");
  }
}

export const getCurrentAvailableStoryRequest = async( 
  storyRequestId: string,
  projection: ProjectionType<StoryRequest> = "",
  options: QueryOptions = { lean: true },
  populate?: PopulateOptions, 
) =>{
  const foundStoryRequest = await findStoryRequest(
    {
      storyRequestId,
      started: false
    },
    projection,
    options,
    populate
  )

  if ( !foundStoryRequest ) {
    return trpcError("BAD_REQUEST", "Send a valid story request id");
  }

  return foundStoryRequest;
}

export const getOwnedAvailableStoryRequest = async( id: string, owner: StaffDocument["_id"] ) => {
  const foundStoryRequest = await getCurrentAvailableStoryRequest(id);

  if ( !foundStoryRequest.owner.equals(owner) ) {
    return trpcError("FORBIDDEN", "Only story request owner can update request")
  }

  return foundStoryRequest;
}

export type WriteupQuery = {
  phase: string,
  writeupId: string
}

export const getSingleWriteup = async( query: FilterQuery<Writeup>, populate?: PopulateOptions ) => {
  const foundWriteup = await findWriteup(query, populate);

  if ( !foundWriteup ) {
    return trpcError("NOT_FOUND", "No write up found")
  }

  return foundWriteup;
}

export const getSingleOwnedWriteup = async( query: FilterQuery<Writeup>, staff: StaffDocument ) => {
  const writeup = await getSingleWriteup(query, 
    {
      path: "request",
      select: "-_id members"
    }
  );

  if ( !writeup.request.members.find(( member: StoryRequestDocument ) => member.equals(staff._id)) ) {
    return trpcError("FORBIDDEN", "Make sure to be a member first to edit")
  }

  return writeup;
}