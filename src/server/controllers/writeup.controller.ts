import { VerifiedStaffContext } from "../middlewares/router.middleware";
import { StoryRequest } from "../models/story.request.model";
import { WRITEUP_PHASES } from "../models/writeup.model";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  ActivitiesTabSchema, 
  SubmitWriteupSchema,
  SaveWriteupPhaseSchema} from "../schemas/writeup.schema";
import { updateStaffService } from "../services/staff.service";
import { 
  findMultipleWriteupAggregator, 
  findWriteupService, 
  updateWriteupService } from "../services/writeup.service";
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

export const saveWriteupPhaseHandler = async(writeupBody: SaveWriteupPhaseSchema, { staff }: VerifiedStaffContext) =>{
  
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

  await updateWriteupService(
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

export const submitWriteupPhaseHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) =>{
  const writeup = writeupValidator(await findWriteupService<{ request: StoryRequest }>(
    {
      writeupId
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

  await updateWriteupService(
    {
      writeupId,
      "content.phase": "writeup"
    },
    {
      "content.$.isSubmitted" : true,
      "content.1": Object.assign( writeup.content[0], { phase: "revision" } ),
      currentPhase: WRITEUP_PHASES[writeupPhaseIndex("writeup")+1]
    }
  )
  
  return trpcSuccess(true, "Successfully submitted")
}

export const takeWriteupTaskHandler = async(writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext) =>{
  const writeup = writeupValidator(await findWriteupService<{ request: StoryRequest }>({ writeupId }))

  if ( writeup.isPublished ) {
    return trpcError("CONFLICT", "Writeup is already published")
  }

  if ( writeup.currentPhase==="finalization" && staff.position.role!=="seniorEditor" ) {
    return trpcError("FORBIDDEN", "Only senior editor is allowed for the finalization")
  }

  const phaseIndex = writeupPhaseIndex(writeup.currentPhase)
  const handledBy = writeup.content[phaseIndex]?.handledBy

  if ( handledBy && handledBy.equals(staff._id) ) {
    return trpcError("CONFLICT", "Already taken this task")
  }

  if ( handledBy ) {
    return trpcError("CONFLICT", "Someone has already taken this task")
  }

  await updateWriteupService(
    { 
      writeupId: writeup.writeupId,
      "content.phase": writeup.currentPhase
    },
    { "content.$.handledBy" : staff._id, }
  )

  if ( !staff.writeups.task.find(task => task.equals(writeup._id)) ) {
    await updateStaffService(
      { bastionId: staff.bastionId },
      {
        $push: {
          "writeups.task": writeup
        }
      }
    )
  }

  return trpcSuccess(true, "Successfully taken task")
}

export const saveWriteupHandler = async( writeupBody: SaveWriteupSchema, { staff }: VerifiedStaffContext ) => {
  writeupPhaseIndex(writeupBody.phase)
}