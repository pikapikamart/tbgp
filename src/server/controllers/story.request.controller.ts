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
  findManyStoryRequest, 
  findStoryRequest, 
  updateStoryRequest } from "../services/story.request.service";
import { 
  apiResult, 
  apiResultWithData } from "../utils/success.util";
import { nanoid } from "nanoid";
import { AnyBulkWriteOperation } from "mongodb";
import { createWriteup } from "../services/writeup.service";
import { StaffContext } from "../middlewares/router.middleware";
import { 
  getCurrentAvailableStoryRequest, 
  getOwnedAvailableStoryRequest, 
  storyRequestValidator} from "./controller.utils";
import { 
  createWriteupPhase, 
  updateWriteupPhase } from "../services/writeup.phase.service";


// --------Queries--------

export const getStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = storyRequestValidator(await findStoryRequest({ storyRequestId }, "owner"));

  if ( foundStoryRequest.owner.equals(staff._id) ) {
    return await findStoryRequest(
      { storyRequestId },
      "-_id",
      { lean: false },
      {
        path: "requests members assignedMembers",
        select: "-_id bastionId firstname lastname"
      }
    )
  } 

  return await getCurrentAvailableStoryRequest(
    storyRequestId,
    "-_id -requests",
    { lean: true },
    {
      path: "owner members assignedMembers",
      select: "-_id bastionId firstname lastname"
    }
  );
}

export const getMultipleStoryRequestsHandler = async() => {
  const storyRequests = await findManyStoryRequest(
    { started: false },
    "-_id -owner -assignedMembers -requests",
    {
      limit: 9,
      sort: "-createdAt"
    }
  );

  return apiResultWithData(true, storyRequests);
}

export const getMultipleAssignedStoryRequestsHandler = async() => {
  const storyRequests = await findManyStoryRequest(
    {
      started: false,
      assignedMembers: {
        $ne: []
      }
    },
    "-_id -owner -assignedMembers -requests",
    {
      limit: 9,
      sort: "-createdAt"
    }
  )

  return apiResultWithData(true, storyRequests)
}

export const getAllCreatedStoryRequestHandler = async( { staff }: StaffContext ) => {
  
  if ( staff.position!==STAFF_POSITIONS.editorInChief ) {
    return trpcError("FORBIDDEN", "Only editor in chief can access created story requests")
  }

  const storyRequests = await findManyStoryRequest(
    {
      owner: staff._id
    },
    "-_id",
    {
      limit: 9,
      sort: "-createdAt"
    }
  );

  return storyRequests;
}

// --------Mutations--------

export const createStoryRequestHandler = async( request: StoryRequestSchema, { staff }: StaffContext ) =>{

  if ( STAFF_POSITIONS.editorInChief!==staff.position ) {
    return trpcError("FORBIDDEN", "Only editor in chief can request story")
  }

  const foundStoryRequest = await findStoryRequest({ title: request.title });

  if ( foundStoryRequest ) {
    return trpcError("CONFLICT", "Request already created")
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

  return apiResult("Story request created", newStoryRequest.storyRequestId);
}

export const applyStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = await getCurrentAvailableStoryRequest(storyRequestId);
  
  if ( foundStoryRequest.requests.find(request => request.equals(staff._id)) ) {
    return trpcError("CONFLICT", "Already applied to story request")
  }

  if ( foundStoryRequest.assignedMembers?.length 
      && !foundStoryRequest.assignedMembers.includes(staff.bastionId) ) {
    return trpcError("FORBIDDEN", "Can't apply to story request when you are not assigned")
  }

  if ( foundStoryRequest.members.find(member => member.equals(staff._id)) ) {
    return trpcError("CONFLICT", "Can't apply when you are already a member")
  }

  await updateStoryRequest(
    { storyRequestId: storyRequestId },
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
    return trpcError("BAD_REQUEST", "Use valid requester bastion Id")
  }

  const foundStoryRequest = await getOwnedAvailableStoryRequest(request.storyRequestId, staff._id);
  
  if ( !foundStoryRequest.requests.find(request => request.equals(foundRequester._id)) ) {
    return trpcError("CONFLICT", "Send a valid requester bastion Id")
  }

  if ( foundStoryRequest.members.find(member => member.equals(foundRequester._id)) ) {
    return trpcError("CONFLICT", "Requester is already a member")
  }
 
  await updateStoryRequest(
    { storyRequestId: request.storyRequestId }, 
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
    { bastionId: request.bastionId }, 
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

export const deleteStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = await getOwnedAvailableStoryRequest(storyRequestId, staff._id);

  const membersAndRequesters = foundStoryRequest.members.concat(foundStoryRequest.requests);

  await bulkUpdateStaff(membersAndRequesters.map(( storyRequestId ): AnyBulkWriteOperation<Staff> => (
    {
      updateOne: {
        filter: {
          _id: storyRequestId
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
  await deleteStoryRequest({ storyRequestId: storyRequestId });

  return apiResult("Successfully deleted story request", true);
}

export const startStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const storyRequest = await getOwnedAvailableStoryRequest(storyRequestId, staff._id);
  const newWriteup = await createWriteup({
    request: storyRequest._id,
    writeupId: nanoid(14),
    title: storyRequest.title,
    caption: "",
    banner: "",
    content: {},
    isEditingBy: "",
    phase: "writeup"
  }) 
  const updatedWriteupPhase = await updateWriteupPhase(
    { phase: "writeup" },
    {
      $push: {
        writeups: newWriteup._id
      }
    }
  )

  if ( !updatedWriteupPhase ) {
    await createWriteupPhase(
      {
        phase: "writeup",
        writeups: [ newWriteup._id ]
      }
    )
  }

  // remove all request made by users to the story
  await bulkUpdateStaff(storyRequest.requests.map(( storyRequestId: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
    {
      updateOne: {
        filter: {
          _id: storyRequestId
        },
        update: {
          $pull: {
            "requests.story": storyRequest._id
          }
        }
      }
    }
  )));
  // // add the writeup to all members of the story
  await bulkUpdateStaff(storyRequest.members.map(( storyRequestId: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
    {
      updateOne: {
        filter: {
          _id: storyRequestId
        },
        update: {
          $push: {
            [ `writeups.${ storyRequest.members.length>1? "collaborated" : "solo" }` ]: newWriteup._id,
          }
        }
      }
    }
  )));
  await updateStoryRequest(
    { storyRequestId: storyRequestId }, 
    {
      requests: [],
      started: true,
      writeupId: newWriteup.writeupId
    }
  );
  
  return apiResult("Successfully started the request", true);
}