import { CATEGORIES } from "../models/story.request.model";
import { 
  Staff,
  StaffDocument, 
  STAFF_POSITIONS } from "../models/staff.model";
import { 
  StoryRequestSchema,
  AcceptStoryRequestSchema,
  StoryRequestIdSchema} from "../schemas/story.request.schema";
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
import { WRITEUP_PHASE } from "../models/writeup.model";
import { createWriteup } from "../services/writeup.service";
import { StaffContext } from "../middlewares/router.middleware";
import { 
  getCurrentAvailableStoryRequest, 
  getOwnedAvailableStoryRequest } from "./controller.utils";


export const createStoryRequestHandler = async( request: StoryRequestSchema, { staff }: StaffContext ) =>{

  if ( STAFF_POSITIONS.editorInChief!==staff.position ) {
    return trpcError("UNAUTHORIZED", "Only editor in chief can request story")
  }

  const foundStoryRequest = await findStoryRequest({ title: request.title });

  if ( foundStoryRequest ) {
    return trpcError("BAD_REQUEST", "Request already created")
  }

  const newStoryRequest = await createStoryRequest(
    {
      ...request,
      storyRequestId: nanoid(14),
      category: CATEGORIES[request.category],
      assignedMembers: request.assignedMembers? Array.from(new Set(request.assignedMembers)) : [],
      owner: staff._id,
      started: false,
      members: [],
      requests: []
    }
  );
  await updateStaff(
    { bastionId: staff.bastionId },
    { 
      $push: {
        "storyRequests.created": newStoryRequest._id
      } 
    } 
  )

  return apiResult("Story request created", true);
}

export const applyStoryRequestHandler = async( { id }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = await getCurrentAvailableStoryRequest(id);
  
  if ( foundStoryRequest.requests?.find(request => request.equals(staff._id)) ) {
    return trpcError("BAD_REQUEST", "Already applied to story request")
  }

  if ( foundStoryRequest.assignedMembers?.length 
      && !foundStoryRequest.assignedMembers.includes(staff.bastionId) ) {
    return trpcError("FORBIDDEN", "Can't apply to story request when you are not assigned")
  }

  if ( foundStoryRequest.members.find(member => member.equals(staff._id)) ) {
    return trpcError("BAD_REQUEST", "Can't apply when you are already a member")
  }

  await updateStoryRequest(
    { storyRequestId: id },
    { 
      $push: {
        requests: staff._id
      }
    }
  )
  await updateStaff(
    { bastionId: staff.bastionId },
    {
      $push: {
        "requests.story": foundStoryRequest._id
      }
    }
  )

  return apiResult("Successfully applied to story", true);
}

export const acceptStoryRequestHandler = async( request: AcceptStoryRequestSchema, { staff }: StaffContext ) => {
  const foundRequester = await findStaff({ bastionId: request.bastionId });

  if ( !foundRequester ) {
    return trpcError("BAD_REQUEST", "Use valid requester bastion id")
  }

  const foundStoryRequest = await getOwnedAvailableStoryRequest(request.id, staff._id);
  
  if ( !foundStoryRequest.requests.find(request => request.equals(foundRequester._id)) ) {
    return trpcError("BAD_REQUEST", "Send a valid requester id")
  }

  if ( foundStoryRequest.members.find(member => member.equals(foundRequester._id)) ) {
    return trpcError("BAD_REQUEST", "Requester is already a member")
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

export const deleteStoryRequestHandler = async( { id }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = await getOwnedAvailableStoryRequest(id, staff._id);

  const membersAndRequesters = foundStoryRequest.members.concat(foundStoryRequest.requests);

  await bulkUpdateStaff(membersAndRequesters.map(( id ): AnyBulkWriteOperation<Staff> => (
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
  )))
  await updateStaff(
    { bastionId: staff.bastionId },
    {
      $pull: {
        "storyRequests.created": foundStoryRequest._id
      }
    }
  )
  await deleteStoryRequest({ storyRequestId: id });

  return apiResult("Successfully deleted story request", true);
}

export const startStoryRequestHandler = async( { id }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = await getOwnedAvailableStoryRequest(id, staff._id);
  const newWriteup = await createWriteup(
    {
      request: foundStoryRequest._id,
      title: foundStoryRequest.title,
      caption: "",
      banner: "",
      content: [],
      phase: WRITEUP_PHASE.writeup
    }
  );

  await bulkUpdateStaff(foundStoryRequest.requests.map(( id: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
    {
      updateOne: {
        filter: {
          _id: id
        },
        update: {
          $pull: {
            "requests.story": foundStoryRequest._id
          }
        }
      }
    }
  )));
  await bulkUpdateStaff(foundStoryRequest.members.map(( id: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
    {
      updateOne: {
        filter: {
          _id: id
        },
        update: {
          $push: {
            [ `writings.${ foundStoryRequest.members.length>1? "collaborated" : "solo" }` ]: newWriteup._id
          }
        }
      }
    }
  )));
  await updateStoryRequest(
    { storyRequestId: id }, 
    {
      requests: [],
      started: true
    }
  );
  
  return apiResult("Successfully started the request", true);
}