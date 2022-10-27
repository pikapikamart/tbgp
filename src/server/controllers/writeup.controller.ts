import { VerifiedStaffContext } from "../middlewares/router.middleware";
import { StoryRequest } from "../models/story.request.model";
import { WRITEUP_PHASES } from "../models/writeup.model";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  ActivitiesTabSchema, 
  SubmitWriteupSchema} from "../schemas/writeup.schema";
import { 
  findMultipleWriteupAggregator, 
  findWriteupService, 
  updateWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { trpcSuccess } from "../utils/success.util";
import { 
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

export const submitWriteupPhaseHandler = async( submit: SubmitWriteupSchema, { staff }: VerifiedStaffContext ) =>{
  const writeup = writeupValidator(await findWriteupService<{ request: StoryRequest }>(
    {
      writeupId: submit.writeupId
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

  if ( writeup.isPublished ) {
    return trpcError("CONFLICT", "Writeup is already published")
  }

  await updateWriteup(
    {
      writeupId: submit.writeupId,
      "content.phase": "writeup"
    },
    {
      "content.$.isSubmitted" : true,
      "content.1": writeup.content[0],
      currentPhase: WRITEUP_PHASES[writeupPhaseIndex("writeup")+1]
    }
  )
  
  return trpcSuccess(true, "Successfully submitted")
}

export const saveWriteupHandler = async( writeupBody: SaveWriteupSchema, { staff }: VerifiedStaffContext ) => {
  writeupPhaseIndex(writeupBody.phase)
}