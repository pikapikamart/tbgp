import { StaffContext, VerifiedStaffContext } from "../middlewares/router.middleware";
import { StoryRequest } from "../models/story.request.model";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  ActivitiesTabSchema } from "../schemas/writeup.schema";
import { 
  findMultipleWriteupAggregator, 
  findWriteupService, 
  updateWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { 
  apiResult, 
  trpcSuccess } from "../utils/success.util";
import { 
  getSingleOwnedWriteup, 
  getSingleWriteup, 
  isStoryRequest, 
  writeupPhaseIndex,
  writeupValidator} from "./controller.utils";


// --------Queries--------

export const getWriteupHandler = async( writeupId : WriteupIdSchema ) => {
  const writeup = await getSingleWriteup(
    { writeupId },
    {
      path: "request",
      select: "-_id -requests -assignedmembers",
      populate: {
        path: "owner members",
        select: "-_id firstname lastname bastionId"
      }
    }
  );

  return trpcSuccess(true, writeup);
}

export type InitialWriteup = {
  writeupId: string,
  category: string,
  content: {
    title: string,
    caption: string
  }
}

export const getMultipleWriteupHandler = async(phase: ActivitiesTabSchema) =>{
  const aggregatedWriteups = await findMultipleWriteupAggregator([
    {
      $match: { currentPhase: phase }
    },
    {
      $sort: { createdAt: 1 }
    },
    {
      $project: {
        _id: 0,
        category: 1,
        writeupId: 1,
        content: {
          $arrayElemAt: [ "$content", writeupPhaseIndex(phase) ]
        }
      }
    },
    {
      $project: {
        category: 1,
        writeupId: 1,
        "content.title": 1,
        "content.caption": 1
      }
    }
  ])

  return trpcSuccess(true, aggregatedWriteups as InitialWriteup[])
}

// --------Mutations--------

export const saveWriteupPhaseHandler = async(writeupBody: SaveWriteupSchema, { staff }: VerifiedStaffContext) =>{
  
  if ( !writeupBody.phase  || writeupBody.phase!=="writeup" ) {
    return trpcError("BAD_REQUEST", "Phase should not be empty")
  }

  const writeup = writeupValidator(await findWriteupService<{ request: StoryRequest }>(
    {
      writeupId: writeupBody.writeupId
    },
    {
      path: "request",
      select: "members storyRequestId"
    }
  ))
  
  if ( isStoryRequest(writeup.request) && !writeup.request.members.find(member => member.equals(staff._id)) ) {
    return trpcError("FORBIDDEN", "Only members of writeup are allowed")  
  }

  if ( writeup.content[0].isSubmitted ) {
    return trpcError("CONFLICT", "Writeup is already submitted")
  }

  if ( writeup.content[0].isAccepted ) {
    return trpcError("CONFLICT", "Writeup is already accepted in this phase")
  }

  await updateWriteup(
    {
      writeupId: writeupBody.writeupId,
      "content.phase": "writeup"
    },
    {
      $set: {
        "content.$.title" : writeupBody.title,
        "content.$.caption": writeupBody.caption,
        "content.$.data": writeupBody.content
      }
    }
  )

  return trpcSuccess(true, "Successfully saved")

}

export const saveWriteupHandler = async( writeupBody: SaveWriteupSchema, { staff }: VerifiedStaffContext ) => {
  

  await getSingleOwnedWriteup(
    { writeupId: writeupBody.writeupId },
    staff
  );
  
  const updatedWriteup = await updateWriteup(
    {
      writeupId: writeupBody.writeupId,
      isEditingBy: staff.bastionId
    },
    {
      title: writeupBody.title,
      caption: writeupBody.caption,
      banner: writeupBody.banner,
      $set: {
        [`content.${ writeupBody.phase }`]: writeupBody.content
      }
    }
  )

  if ( !updatedWriteup ) {
    return trpcError("CONFLICT", "Someone is already editing, wait for it to finish")
  }

  return apiResult("Successfully saved writeup", true);
}