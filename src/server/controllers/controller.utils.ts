import { 
  PopulateOptions, 
  ProjectionType } from "mongoose";
import { StaffDocument } from "../models/staff.model";
import { Writeups } from "../models/writeups.model";
import { getAdmin } from "../services/admin.service"
import { findStoryRequest } from "../services/story.request.service";
import { findWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";


export const getCurrentAdmin = async() => {
  const admin = await getAdmin();

  if ( !admin ) {
    return trpcError("INTERNAL_SERVER_ERROR", "Admin is still not created")
  }

  return admin;
}

export const getCurrentAvailableStoryRequest = async( id: string ) =>{
  const foundStoryRequest = await findStoryRequest(
    {
      storyRequestId: id,
      started: false
    }
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

export const getSingleWriteup = async( 
  query: WriteupQuery,
  projection: ProjectionType<Writeups>="",
  populate?: PopulateOptions 
) => {
  const writeupQuery = {
    phase: query.phase,
    "writings.writeupId": query.writeupId
  }
  const foundWriteup = await findWriteup(writeupQuery, projection, populate);

  if ( !foundWriteup ) {
    return trpcError("NOT_FOUND", "No writeup found with this phase and writeup id")
  }

  return foundWriteup;
}