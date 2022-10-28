import { storyCategories } from "../models/story.request.model";
import { 
  Staff,
  StaffDocument } from "../models/staff.model";
import { 
  StoryRequestSchema,
  AcceptRejectStoryRequestSchema,
  StoryRequestIdSchema,
  StoryRequestTabSchema} from "../schemas/story.request.schema";
import { 
  bulkUpdateStaffService,
  findManyStaffsService,
  findStaffService, 
  updateStaffService } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { 
  createStoryRequestService, 
  deleteStoryRequest, 
  findManyStoryRequestAggregator, 
  findStoryRequest, 
  updateStoryRequest } from "../services/story.request.service";
import { 
  apiResult, 
  trpcSuccess } from "../utils/success.util";
import { AnyBulkWriteOperation } from "mongodb";
import { createWriteup } from "../services/writeup.service";
import { StaffContext, VerifiedStaffContext } from "../middlewares/router.middleware";
import { 
  customNanoid,
  getCurrentAvailableStoryRequest, 
  getOwnedAvailableStoryRequest, 
  staffValidator, 
  storyRequestValidator} from "./controller.utils";


// --------Queries--------

export const getStoryRequestHandler = async( { storyRequestId }: StoryRequestIdSchema, { staff }: StaffContext ) => {
  const foundStoryRequest = storyRequestValidator(await findStoryRequest({ storyRequestId }, "owner"));
  
  const storyRequest = await getCurrentAvailableStoryRequest(
    storyRequestId,
    "-_id",
    { lean: true },
    {
      path: "owner requests members assignedMembers",
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

  if ( foundStoryRequest.assignedMembers && !foundStoryRequest.assignedMembers.find(member => member.equals(staff._id)) ) {
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
        "storyRequests.requested": foundStoryRequest._id
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

  const assignedMembers = await findManyStaffsService(
    {
      bastionId: {
        $in: request.assignedMembers?? []
      }
    },
    "_id"
  )

  const newStoryRequest = await createStoryRequestService(
    {
      ...request,
      storyRequestId: customNanoid(14),
      category: storyCategories[request.category],
      owner: staff._id,
      assignedMembers: assignedMembers.length? assignedMembers.map(member => member._id) : null,
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

  const filtedCreatedStoryRequest = {
    storyRequestId: newStoryRequest.storyRequestId,
    title: newStoryRequest.title,
    category: newStoryRequest.category,
    members: [],
    instruction: newStoryRequest.instruction,
    requests: [],
    createdAt: newStoryRequest.createdAt
  }

  return trpcSuccess(true, filtedCreatedStoryRequest);
}

export const acceptRejectStoryRequestHandler = async( request: AcceptRejectStoryRequestSchema, { staff }: VerifiedStaffContext ) => {
  const foundRequester = staffValidator(await findStaffService({ bastionId: request.bastionId }))
  
  const foundStoryRequest = await getOwnedAvailableStoryRequest(request.storyRequestId, staff._id);
  
  if ( !foundStoryRequest.requests.find(request => request.equals(foundRequester._id)) ) {
    return trpcError("CONFLICT", "Found staff is not a valid requester in the story request")
  }

  if ( foundStoryRequest.members.find(member => member.equals(foundRequester._id)) ) {
    return trpcError("CONFLICT", "Found staff is already a member")
  }
 
  await updateStoryRequest(
    { storyRequestId: request.storyRequestId }, 
    Object.assign(
      { 
        $pull: {
          requests: foundRequester._id
        }
      }, request.choice? {
        $push: {
          members: foundRequester._id
        }
      } : undefined
    )
  )

  await updateStaffService(
    { bastionId: request.bastionId }, 
    Object.assign(
      {
        $pull: {
          "storyRequests.requested": foundStoryRequest._id
        }
      }, request.choice? {
        $push: {
          "storyRequests.joined": foundStoryRequest._id
        }
      } : undefined
    )
  )

  return trpcSuccess(true, 
    { 
      choice: request.choice,
      staff: {
        bastionId: request.bastionId ,
        firstname: foundRequester.firstname,
        lastname: foundRequester.lastname,
        username: foundRequester.username
      }
    }
  )
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
            "storyRequests.requested": foundStoryRequest._id,
            "storyRequests.joined": foundStoryRequest._id
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
  
  if ( !storyRequest.members.length ) {
    return trpcError("BAD_REQUEST", "Story request can be started when there is atleast 1 member joined.")
  }

  const newWriteup = await createWriteup({
    request: storyRequest._id,
    writeupId: customNanoid(14),
    banner: "",
    category: storyRequest.category,
    currentPhase: "writeup",
    isPublished: false,
    content: [
      {
        phase: "writeup",
        title: storyRequest.title,
        caption: "",
        data: [],
        notes: [],
      },
      null,
      null,
      null,
      null
    ],
  }) 

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
  )))
  
  await updateStoryRequest(
    { storyRequestId: storyRequestId }, 
    {
      started: true,
      writeupId: newWriteup.writeupId
    }
  )
  
  return apiResult("Successfully started the request", true);
}