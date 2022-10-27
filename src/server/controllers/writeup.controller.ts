import { VerifiedStaffContext } from "../middlewares/router.middleware";
import { StoryRequest } from "../models/story.request.model";
import { WRITEUP_PHASES } from "../models/writeup.model";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  ActivitiesTabSchema, 
  SaveWriteupPhaseSchema,
  ReSubmitWriteupScheam} from "../schemas/writeup.schema";
import { updateStaffService } from "../services/staff.service";
import { 
  findMultipleWriteupAggregator, 
  findWriteupPopulatorService, 
  findWriteupService, 
  updateWriteupService } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { trpcSuccess } from "../utils/success.util";
import { 
  isStoryRequest, 
  writeupPhaseIndex,
  writeupValidator} from "./controller.utils";


// --------Queries--------


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
  
  const writeup = writeupValidator(await findWriteupPopulatorService<{ request: StoryRequest }>(
    {
      writeupId: writeupBody.writeupId,
      isPublished: false
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
  const writeup = writeupValidator(await findWriteupPopulatorService<{ request: StoryRequest }>(
    {
      writeupId,
      isPublished: false
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

  if ( writeup.content[0].reSubmit ) {
    await updateWriteupService(
      {
        writeupId,
        "content.phase": "writeup"
      },
      {
        "content.$.isSubmitted" : true,
        "content.$.reSubmit": false,
        "content.1": Object.assign( writeup.content[0], { 
          phase: "revision", 
          reSubmit: false,
          notes: [],
          handledBy: writeup.content[1]?.handledBy
        } ),
        currentPhase: WRITEUP_PHASES[writeupPhaseIndex("writeup")+1]
      }
    )

    return trpcSuccess(true, "Successfully submitted")
  } 

  await updateWriteupService(
    {
      writeupId,
      "content.phase": "writeup"
    },
    {
      "content.$.isSubmitted" : true,
      "content.$.reSubmit": false,
      "content.1": Object.assign( writeup.content[0], { phase: "revision" } ),
      currentPhase: WRITEUP_PHASES[writeupPhaseIndex("writeup")+1]
    }
  )
  
  return trpcSuccess(true, "Successfully submitted")
}

// ----Verified Editors----

export const takeWriteupTaskHandler = async(writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext) =>{
  const writeup = writeupValidator(await findWriteupService(
    { 
      writeupId,
      isPublished: false
    },
    "",
    { lean: true })
  )

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
  const writeup = writeupValidator(await findWriteupService(
    { 
      writeupId: writeupBody.writeupId,
      isPublished: false
    },
    "", 
    { lean: true })
  )
  const phaseIndex = writeupPhaseIndex(writeup.currentPhase)

  if ( !writeup.content[phaseIndex]?.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  if ( writeup.content[phaseIndex-1]?.reSubmit ) {
    return trpcError("CONFLICT", "You can only save when resubmission of lower phase is done")
  }

  const graphicsUpdate = writeup.currentPhase==="graphics"? { banner: writeupBody.banner } : {}

  const updatedWriteup = await updateWriteupService(
    {
      writeupId: writeupBody.writeupId,
      "content.phase": writeup.currentPhase,
      "content.handledBy": staff._id
    },
    {
      ...graphicsUpdate,
      "content.$.title": writeupBody.title,
      "content.$.caption": writeupBody.caption,
      "content.$.data": writeupBody.content
    }
  )

  if ( !updatedWriteup ) {
    return trpcError("FORBIDDEN", "You can only save writeups in your tasks")
  }

  return trpcSuccess(true, "Successfully saved")
}

export const submitWriteupHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) => {
  const writeup = writeupValidator(await findWriteupService(
    { 
      writeupId,
      isPublished: false
    },
    "", 
    { lean: true })
  )

  if ( writeup.currentPhase==="finalization" ) {
    return trpcError("CONFLICT", "Can't submit into a higher phase")
  }

  const phaseIndex = writeupPhaseIndex(writeup.currentPhase)
  const currentContent = writeup.content[phaseIndex]

  if ( !currentContent?.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  if ( currentContent.isSubmitted ) {
    return trpcError("CONFLICT", "Writeup is already submitted")
  }

  if ( currentContent.isAccepted ) {
    return trpcError("CONFLICT", "Writeup is already accepted in this phase")
  }

  const nextPhase = WRITEUP_PHASES[phaseIndex+1]

  if ( currentContent.reSubmit ) {
    await updateWriteupService(
      {
        writeupId,
        "content.phase": writeup.currentPhase
      },
      {
        "content.$.isSubmitted" : true,
        "content.$.reSubmit": false,
        [`content.${ phaseIndex+1 }`]: Object.assign( currentContent, { 
          phase: nextPhase, 
          reSubmit: false,
          notes: [],
          handledBy: writeup.content[phaseIndex+1]?.handledBy
        } ),
        currentPhase: nextPhase
      }
    )

    return trpcSuccess(true, "Successfully submitted")
  } 

  // update the previous
  await updateWriteupService(
    {
      writeupId,
      "content.phase": writeup.currentPhase
    },
    {
      "content.$.isSubmitted" : true,
      "content.$.reSubmit": false,
      [`content.${ phaseIndex+1 }`]: Object.assign( currentContent, { phase: nextPhase } ),
      [`content.${ phaseIndex-1 }.isAccepted`]: true,
      currentPhase: nextPhase
    }
  )

  return trpcSuccess(true, "Successfully submitted")
}

export const requestReSubmitHandler = async( reSubmitBody: ReSubmitWriteupScheam, { staff }: VerifiedStaffContext ) =>{
  const writeup = writeupValidator(await findWriteupService(
    { 
      writeupId: reSubmitBody.writeupId,
      isPublished: false
    },
    "", 
    { lean: true })
  )
  const phaseIndex = writeupPhaseIndex(writeup.currentPhase)
  const currentContent = writeup.content[phaseIndex]

  if ( !currentContent?.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  if ( currentContent?.isSubmitted ) {
    return trpcError("CONFLICT", "Re-submit is not allowed when you already submitted the writeup")
  }

  if ( writeup.content[phaseIndex-1]?.reSubmit ) {
    return trpcError("CONFLICT", "Wait for the re-submission to be finished before requesting again")
  }

  if ( writeup.content[phaseIndex-1]?.isAccepted ) {
    return trpcError("CONFLICT", "Re-submit is not allowed when you submitted your task. Take responsibility")
  }

  await updateWriteupService(
    {
      writeupId: reSubmitBody.writeupId,
      "content.phase": WRITEUP_PHASES[phaseIndex-1]
    },
    {
      "content.$.isSubmitted": false,
      "content.$.reSubmit": true,
      "content.$.notes": reSubmitBody.notes,
      currentPhase: WRITEUP_PHASES[phaseIndex-1]
    }
  )

  return trpcSuccess(true, "Requested re-submission successfully")
}