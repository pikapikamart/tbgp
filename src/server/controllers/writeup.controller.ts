import { ArrayElement } from "mongodb";
import { 
  StaffContext, 
  VerifiedStaffContext } from "../middlewares/router.middleware";
import { 
  WriteupDocument, 
  WRITEUP_PHASES } from "../models/writeup.model";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  ActivitiesTabSchema, 
  SaveWriteupPhaseSchema,
  ReSubmitWriteupScheam,
  SingleWriteupSchema} from "../schemas/writeup.schema";
import { updateStaffService } from "../services/staff.service";
import { 
  findMultipleWriteupAggregator, 
  findWriteupPopulatorService, 
  updateWriteupService, 
  writeupPopulatorService} from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { trpcSuccess } from "../utils/success.util";
import { 
  findWriteupHelper,
  populateWriteupHelper, 
  writeupPhaseIndex, 
  writeupValidator} from "./controller.utils";


// ----Helpers----
const updateQuery = ( writeup: WriteupDocument ) =>({
  writeupId: writeup.writeupId,
  "content.phase": writeup.currentPhase,
}) 

const baseSaveUpdateBody = ( saveBody: SaveWriteupSchema ) => ({
  "content.$.title" : saveBody.title,
  "content.$.caption": saveBody.caption,
  "content.$.data": saveBody.content
})

const baseSubmitUpdateBody = ( phaseIndex: number ) => ({
  "content.$.isSubmitted" : true,
  "content.$.reSubmit": false,
  "content.$.requestedResubmit": false,
  currentPhase: WRITEUP_PHASES[phaseIndex+1]
})

const baseResubmitUpdateBody = ( writeup: WriteupDocument, currentContent: NonNullable<ArrayElement<typeof writeup["content"]>>, phaseIndex: number ) => Object.assign(
  baseSubmitUpdateBody(phaseIndex),
  {
    [ `content.${ phaseIndex+1 }` ]: Object.assign(currentContent, {
      phase: WRITEUP_PHASES[phaseIndex+1], 
      reSubmit: false,
      notes: [],
      handledBy: writeup.content[phaseIndex+1]?.handledBy
    })
  }
)

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

export const getWriteupHandler = async( query: SingleWriteupSchema, { staff }: StaffContext ) => {
  const writeup = writeupValidator(await findWriteupPopulatorService(
    {
      writeupId: query.writeupId,
      "content.phase": query.phase
    },
    {
      path: "request",
      select: "-_id members title category instruction content.$ createdAt",
      populate: {
        path: "members",
        select: "-_id firstname lastname username"
      }
    },
    "-_id request writeupId banner content.$ currentPhase"
  ))

  await writeupPopulatorService(writeup, {
    path: "content.handledBy",
    select: "-_id firstname lastname username"
  })
  
  return trpcSuccess(true, writeup)
}

// --------Mutations--------

export const saveWriteupPhaseHandler = async(writeupBody: SaveWriteupPhaseSchema, { staff }: VerifiedStaffContext) =>{
  const writeup = await populateWriteupHelper(writeupBody.writeupId, staff._id)

  await updateWriteupService(
    updateQuery(writeup),
    baseSaveUpdateBody(writeupBody)
  )
  
  return trpcSuccess(true, "Successfully saved")
}

export const submitWriteupPhaseHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) =>{
  const writeup = await populateWriteupHelper(writeupId, staff._id)

  if ( writeup.content[0].reSubmit ) {
    await updateWriteupService(
      updateQuery(writeup),
      baseResubmitUpdateBody(writeup, writeup.content[0], 0)
    )

    return trpcSuccess(true, "Successfully submitted")
  } 

  await updateWriteupService(
    updateQuery(writeup),
    Object.assign(baseSubmitUpdateBody(0), { "content.1": Object.assign( writeup.content[0], { 
      phase: "revision",
      reSubmit: false,
      notes: [] 
    } ),})
  )
  
  return trpcSuccess(true, "Successfully submitted")
}

// ----Verified Editors----

export const takeWriteupTaskHandler = async(writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext) =>{
  const { writeup, currentContent } = await findWriteupHelper(writeupId)

  if ( writeup.currentPhase==="finalization" && staff.position.role!=="seniorEditor" ) {
    return trpcError("FORBIDDEN", "Only senior editor is allowed for the finalization")
  }

  if ( currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("CONFLICT", "Already taken this task")
  }

  if ( currentContent.handledBy ) {
    return trpcError("CONFLICT", "Someone has already taken this task")
  }

  await updateWriteupService(
    updateQuery(writeup),
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
  const { writeup, phaseIndex, currentContent } = await findWriteupHelper(writeupBody.writeupId)
  const graphicsUpdate = writeup.currentPhase==="graphics"? { banner: writeupBody.banner } : {}

  if ( currentContent?.requestedResubmit ) {
    return trpcError("CONFLICT", "You can only save when resubmission of lower phase is done")
  }

  if ( !currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  await updateWriteupService(
    updateQuery(writeup),
    Object.assign(graphicsUpdate, baseSaveUpdateBody(writeupBody))
  )

  return trpcSuccess(true, "Successfully saved")
}

export const submitWriteupHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) => {
  const { writeup, currentContent, phaseIndex } = await findWriteupHelper(writeupId)

  if ( writeup.currentPhase==="finalization" ) {
    return trpcError("CONFLICT", "Can't submit into a higher phase")
  }

  if ( !currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  if ( currentContent.reSubmit ) {
    await updateWriteupService(
      updateQuery(writeup),
      baseResubmitUpdateBody(writeup, currentContent, phaseIndex)
    )

    return trpcSuccess(true, "Successfully submitted")
  } 

  const { handledBy, ...restContent } = currentContent
  await updateWriteupService(
    updateQuery(writeup),
    Object.assign(baseSubmitUpdateBody(phaseIndex), {
      [`content.${ phaseIndex+1 }`]: Object.assign( restContent, { phase: WRITEUP_PHASES[phaseIndex+1] } ),
      [`content.${ phaseIndex-1 }.isAccepted`]: true,
    })
  )

  return trpcSuccess(true, "Successfully submitted")
}

export const requestReSubmitHandler = async( reSubmitBody: ReSubmitWriteupScheam, { staff }: VerifiedStaffContext ) =>{;;;
  const { writeup, phaseIndex, currentContent } = await findWriteupHelper(reSubmitBody.writeupId)
  
  if ( !phaseIndex && !writeup.content[phaseIndex+1]  ) {
    return trpcError("CONFLICT", "Writeup is yet to be submitted")
  }

  if ( !currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  if ( writeup.content[phaseIndex]?.requestedResubmit ) {
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

  await updateWriteupService(
    {
      writeupId: reSubmitBody.writeupId,
      "content.phase": writeup.currentPhase
    },
    { "content.$.requestedResubmit": true }
  )

  return trpcSuccess(true, "Requested re-submission successfully")
}