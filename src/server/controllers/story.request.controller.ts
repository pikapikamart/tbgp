import { storyCategories } from "../models/story.request.model";
import { 
  Staff,
  StaffDocument } from "../models/staff.model";
import { 
  StoryRequestSchema,
  AcceptStoryRequestSchema,
  StoryRequestIdSchema,
  StoryRequestTabSchema} from "../schemas/story.request.schema";
import { 
  bulkUpdateStaffService,
  findStaffService, 
  updateStaffService } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { 
  createStoryRequestService, 
  deleteStoryRequest, 
  findManyStoryRequestAggregator, 
  findManyStoryRequestService, 
  findStoryRequest, 
  updateStoryRequest } from "../services/story.request.service";
import { 
  apiResult, 
  trpcSuccess } from "../utils/success.util";
import { nanoid } from "nanoid";
import { AnyBulkWriteOperation } from "mongodb";
import { createWriteup } from "../services/writeup.service";
import { StaffContext, VerifiedStaffContext } from "../middlewares/router.middleware";
import { 
  getCurrentAvailableStoryRequest, 
  getOwnedAvailableStoryRequest, 
  storyRequestValidator} from "./controller.utils";
import { 
  createWriteupPhase, 
  updateWriteupPhase } from "../services/writeup.phase.service";


const optionsStoryRequest = {
  limit: 9,
  sort: "-createdAt"
}

// --------Queries--------

export const getStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = storyRequestValidator(await findStoryRequest({ storyRequestId }, "owner"));
  
  if ( foundStoryRequest.owner.equals(staff._id) ) {
    const storyRequest = storyRequestValidator(await findStoryRequest(
      { storyRequestId },
      "-_id",
      { lean: false },
      {
        path: "owner requests members assignedMembers",
        select: "-_id bastionId firstname lastname username"
      }
    ))

    return trpcSuccess(true, storyRequest)
  } 

  const storyRequest = await getCurrentAvailableStoryRequest(
    storyRequestId,
    "-_id -requests",
    { lean: true },
    {
      path: "owner members assignedMembers",
      select: "-_id bastionId firstname lastname username"
    }
  )

  return trpcSuccess(true, storyRequest)
}

export const getMultipleStoryRequestsHandler = async( tab: StoryRequestTabSchema, { staff }: StaffContext ) => {
  let matchQuery: any = {};
  
  switch( tab ) {
    case "assigned":
      matchQuery.assignedMembers = {
        $ne:null
      }
      break
    case "created":
      if ( staff.position?.role==="writer" ) {
        return trpcError("FORBIDDEN", "Only valid editor is allowed")
      }

      matchQuery.owner = staff._id
      break
    default:
      matchQuery.assignedMembers = {
        $eq: null
      }
  }

  const aggregatedStoryRequests = await findManyStoryRequestAggregator(
    [
      {
        $match: {
          started: false,
          ...matchQuery
        }
      },
      {
        $sort: {
          createdAt: 1
        }
      },
      {
        $limit: 9
      },
      {
        $project: {
          _id: 0,
          owner: 0,
          assignedMembers: 0,
          requests: 0,
          writeupId: 0
        }
      },
      {
        $set: {
          members: {
            $size: "$members"
          }
        }
      }
    ]
  )
   
  return trpcSuccess(true, aggregatedStoryRequests);
}

// --------Mutations--------

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
  await updateStaffService(
    { bastionId: staff.bastionId },
    {
      $push: {
        "requests.story": foundStoryRequest._id
      }
    }
  )

  return apiResult("Successfully applied to story", true);
}

// ----Verified Editor ----

export const createStoryRequestHandler = async( request: StoryRequestSchema, { staff }: VerifiedStaffContext ) =>{

  const foundStoryRequest = await findStoryRequest({ title: request.title });

  if ( foundStoryRequest ) {
    return trpcError("CONFLICT", "Request already created")
  }

  const newStoryRequest = await createStoryRequestService(
    {
      ...request,
      storyRequestId: nanoid(14),
      category: storyCategories[request.category],
      owner: staff._id,
      assignedMembers: request.assignedMembers? Array.from(new Set(request.assignedMembers)) : null,
      started: false,
      members: [],
      requests: [],
      writeupId: null
    }
  )
  
  await updateStaffService(
    { bastionId: staff.bastionId },
    { 
      $push: {
        "storyRequests.created": newStoryRequest._id
      } 
    } 
  )

  return apiResult("Story request created", newStoryRequest.storyRequestId);
}

export const acceptStoryRequestHandler = async( request: AcceptStoryRequestSchema, { staff }: VerifiedStaffContext ) => {
  const foundRequester = await findStaffService({ bastionId: request.bastionId });
  
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
  await updateStaffService(
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

export const deleteStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: VerifiedStaffContext ) => {
  const foundStoryRequest = await getOwnedAvailableStoryRequest(storyRequestId, staff._id);

  const membersAndRequesters = foundStoryRequest.members.concat(foundStoryRequest.requests);

  await bulkUpdateStaffService(membersAndRequesters.map(( storyRequestId ): AnyBulkWriteOperation<Staff> => (
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
  await updateStaffService(
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

export const startStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: VerifiedStaffContext ) => {
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
  await bulkUpdateStaffService(storyRequest.requests.map(( storyRequestId: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
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
  await bulkUpdateStaffService(storyRequest.members.map(( storyRequestId: StaffDocument["_id"] ): AnyBulkWriteOperation<Staff> => (
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
      started: true,
      writeupId: newWriteup.writeupId
    }
  );
  
  return apiResult("Successfully started the request", true);
}