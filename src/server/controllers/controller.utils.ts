import { StaffDocument } from "../models/staff.model";
import { WriteupIdSchema } from "../schemas/writeup.schema";
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

export const getSingleWriteup = async( writeupId: WriteupIdSchema ) => {
  const foundWriteup = await findWriteup({ writeupId });

  if ( !foundWriteup ) {
    return trpcError("NOT_FOUND", "No writeup found with this id")
  }

  return foundWriteup;
}