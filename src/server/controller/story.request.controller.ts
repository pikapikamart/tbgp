import { 
  CATEGORIES, 
  StoryRequest } from "../models/story.request.model";
import { 
  Staff,
  StaffDocument, 
  STAFF_POSITIONS } from "../models/staff.model";
import { 
  ApplyStoryRequestSchema, 
  StoryRequestSchema,
  AcceptStoryRequestSchema,
  DeleteStoryRequestSchema } from "../schema/story.request.schema";
import { 
  bulkUpdateStaff,
  findStaff, 
  updateStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { 
  createStoryRequest, 
  deleteStoryRequest, 
  findStoryRequest, 
  updateStoryRequest } from "../services/story.request.service";
import { apiResult } from "../utils/success.util";
import { nanoid } from "nanoid";
import { AnyBulkWriteOperation } from "mongodb";


export const createStoryRequestHandler = async( request: StoryRequestSchema ) =>{
  const foundStaff = await findStaff({ bastionId: request.bastionId }, { lean: false });

  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "No staff found")
  }

  if ( STAFF_POSITIONS.editorInChief!==foundStaff.position ) {
    return trpcError("UNAUTHORIZED", "Only editor in chief can request story")
  }

  const foundStoryRequest = await findStoryRequest({ title: request.title });

  if ( foundStoryRequest ) {
    return trpcError("CONFLICT", "Request already created")
  }

  const sanitizeAssignment = request.assignedMembers? Array.from(new Set(request.assignedMembers)) : [];

  const storyRequestBody: StoryRequest = {
    ...request,
    storyRequestId: nanoid(14),
    category: CATEGORIES[request.category],
    assignedMembers: sanitizeAssignment,
    owner: foundStaff._id,
    members: [],
    requests: []
  }

  const newStoryRequest = await createStoryRequest(storyRequestBody);
  await updateStaff(
    { bastionId: foundStaff.bastionId },
    { 
      $push: {
        "storyRequests.created": newStoryRequest._id
      } 
    } 
  )

  return apiResult("Story request created", true);
}

export const applyStoryRequestHandler = async( { bastionId, id }: ApplyStoryRequestSchema ) => {
  const foundStaff = await findStaff({ bastionId }, { lean: false });

  // Forbidden
  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "No staff found")
  }
  
  const foundStoryRequest = await findStoryRequest({ storyRequestId: id });
  
  if ( !foundStoryRequest ) {
    return trpcError("NOT_FOUND", "No story request found")
  }

  if ( foundStoryRequest.requests.find(request => request.equals(foundStaff._id)) ) {
    return trpcError("BAD_REQUEST", "Already applied to story request")
  }

  if ( foundStoryRequest.assignedMembers?.length && !foundStoryRequest.assignedMembers.includes(foundStaff.bastionId) ) {
    return trpcError("FORBIDDEN", "Can't when you are not assigned in a story")
  }

  if ( foundStoryRequest.members.find(member => member.equals(foundStaff._id)) ) {
    return trpcError("BAD_REQUEST", "Can't apply when you are already a member")
  }

  await updateStoryRequest(
    { storyRequestId: id },
    { 
      $push: {
        requests: foundStaff._id
      }
    }
  )
  await updateStaff(
    { bastionId },
    {
      $push: {
        "requests.story": foundStoryRequest._id
      }
    }
  )

  return apiResult("Successfully applied to story", true);
}

export const acceptStoryRequestHandler = async( request: AcceptStoryRequestSchema ) => {
  const foundOwner = await findStaff({ bastionId: request.bastionId });

  if ( !foundOwner ) {
    return trpcError("FORBIDDEN", "Make sure to create your account properly")
  }
  
  const foundRequester = await findStaff({ bastionId: request.requesterId }, { lean: false });

  if ( !foundRequester ) {
    return trpcError("BAD_REQUEST", "Use valid requester bastion id")
  }

  const foundStoryRequest = await findStoryRequest({ storyRequestId: request.id }, { lean: false });

  if ( !foundStoryRequest ) {
    return trpcError("BAD_REQUEST", "Use valid story request id")
  }
  
  if ( !foundStoryRequest.requests.find(request => request.equals(foundRequester._id)) ) {
    return trpcError("BAD_REQUEST", "Only staff that requested can be accepted")
  }

  if ( foundStoryRequest.members.find(member => member.equals(foundRequester._id)) ) {
    return trpcError("BAD_REQUEST", "Requester is already a member")
  }

  if ( !foundStoryRequest.owner.equals(foundOwner._id) ) {
    return trpcError("BAD_REQUEST", "Make sure to be the story request's owner to accept requsters")
  }
 
  await updateStoryRequest(
    { storyRequestId: request.id }, 
    { 
      $push: {
        members: foundRequester._id
      },
      $pull: {
        requests: foundRequester._id
      }
    }
  )
  await updateStaff(
    { bastionid: foundRequester.bastionId }, 
    {
      $push: {
        "storyRequests.joined": foundStoryRequest._id
      },
      $pull: {
        "requests.story": foundStoryRequest._id
      }
    }
  )

  return apiResult("Successfully accepted a member", true);
}

export const deleteStoryRequestHandler = async( { id, bastionId }: DeleteStoryRequestSchema ) => {
  const foundStaff = await findStaff({ bastionId }, { lean: false });

  if ( !foundStaff ) {
    return trpcError("UNAUTHORIZED", "Make sure to include your bastion id");
  }

  const foundStoryRequest = await findStoryRequest({ storyRequestId: id }, { lean: false });

  if ( !foundStoryRequest ) {
    return trpcError("NOT_FOUND", "No story request with this id found")
  }

  if ( !foundStoryRequest.owner.equals(foundStaff._id) ) {
    return trpcError("BAD_REQUEST", "Only include owned story request")
  }

  const updateStaffBody = ( id: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
    {
      updateOne: {
        filter: {
          _id: id
        },
        update: {
          $pull: {
            "storyRequests.joined": foundStoryRequest._id,
            "requests.story": foundStoryRequest._id
          },
        }
      }
    }
  )

  const membersAndRequestsIds = foundStoryRequest.members.concat(foundStoryRequest.requests);

  await bulkUpdateStaff(membersAndRequestsIds.map(updateStaffBody));
  await updateStaff(
    { bastionId },
    {
      $pull: {
        "storyRequests.created": foundStoryRequest._id
      }
    }
  )
  await deleteStoryRequest({ storyRequestId: id });

  return apiResult("Successfully deleted story request", true);
}