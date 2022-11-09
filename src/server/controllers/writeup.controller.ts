import { 
  InitialWriteup, 
  StaffProfile } from "@/store/store.types";
import { 
  StaffContext, 
  VerifiedStaffContext } from "../middlewares/router.middleware";
import { 
  WriteupContent,
  WriteupNote, 
  WriteupPhases, 
  WRITEUP_PHASES } from "../models/writeup.model";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  ActivitiesTabSchema, 
  SaveWriteupPhaseSchema,
  ReSubmitWriteupScheam,
  SingleWriteupSchema} from "../schemas/writeup.schema";
import { 
  addArticleCategoryService, 
  createArticleCategoryService, 
  findArticleCategoryService } from "../services/article.category.service";
import { createArticleService, findArticleService } from "../services/article.service";
import { updateStaffService } from "../services/staff.service";
import { findStoryRequestService } from "../services/story.request.service";
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
  storyRequestValidator, 
  writeupPhaseIndex, 
  writeupValidator} from "./controller.utils";
import fs from "fs"
import sharp from "sharp"


// ----Helpers----
const updateQuery = ( writeupId: string, currentPhase: WriteupPhases ) =>({
  writeupId,
  "content.phase": currentPhase,
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

export const isContentWriteupPhase = ( currentContent: WriteupContent<WriteupPhases> ): currentContent is WriteupContent<"writeup"> =>{
  return ( currentContent as WriteupContent<"writeup"> ).phase==="writeup"
}

const baseResubmitUpdateBody = ( nextContent: WriteupContent<WriteupPhases>, currentContent: WriteupContent<WriteupPhases>, phaseIndex: number ) => Object.assign(
  baseSubmitUpdateBody(phaseIndex),
  {
    [ `content.${ phaseIndex+1 }` ]: Object.assign(
      currentContent, 
      {
        phase: WRITEUP_PHASES[phaseIndex+1], 
        reSubmit: false,
        notes: [],  
      },
      !isContentWriteupPhase(nextContent)? { handledBy: nextContent.handledBy } : undefined
    )
  }
)

// --------Queries--------

export const getMultipleWriteupHandler = async(phase: ActivitiesTabSchema) =>{
  const aggregatedWriteups = await findMultipleWriteupAggregator([
    {
      $match: { 
        currentPhase: phase,
        isPublished: false
      }
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
        "content.caption": 1,
        "content.phase": 1
      }
    }
  ])

  return trpcSuccess(true, aggregatedWriteups as InitialWriteup[])
}

export type PopulatedWriteup = {
  request: {
    members: StaffProfile[],
    title: string,
    category: string,
    instruction: string,
    createdAt: string
  },
  writeupId: string,
  banner: {
    url: string,
    caption: string
  },
  currentPhase: WriteupPhases,
  content: [{
    phase: string,
    title: string,
    caption: string,
    data: any[],
    notes: WriteupNote[],
    isSubmitted: boolean,
    isAccepted: boolean,
    reSubmit: boolean,
    handledBy?: StaffProfile,
    submissions?: StaffProfile[],
    requestedResubmit: boolean,
  }]
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
        select: "-_id firstname lastname username bastionId"
      }
    },
    "-_id request writeupId banner content.$ currentPhase"
  ))

  await writeupPopulatorService(writeup, {
    path: "content.handledBy content.submissions",
    select: "-_id firstname lastname username bastionId"
  })
  
  return trpcSuccess(true, (writeup as never) as PopulatedWriteup)
}

// --------Mutations--------

export const saveWriteupPhaseHandler = async(writeupBody: SaveWriteupPhaseSchema, { staff }: VerifiedStaffContext) =>{
  const writeup = await populateWriteupHelper(writeupBody.writeupId, staff._id)
  
  if ( writeup.request.members.length > 1 && writeup.content[0].submissions?.find(member => member.equals(staff._id)) ) {
    return trpcError("FORBIDDEN", "Already submitted your work")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, "writeup"),
    baseSaveUpdateBody(writeupBody)
  )
  
  return trpcSuccess(true, "Successfully saved")
}

export const submitWriteupPhaseHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) =>{
  const writeup = await populateWriteupHelper(writeupId, staff._id)
  const currentContent = writeup.content[0]

  if ( writeup.request.members.length > 1 && writeup.content[0].submissions?.find(member => member.equals(staff._id)) ) {
    return trpcError("FORBIDDEN", "Already submitted your work")
  }

  // if ( currentContent.reSubmit ) {
  //   const nextContent = writeup.content[1]

  //   if ( !nextContent ) {
  //     return trpcError("INTERNAL_SERVER_ERROR", "Server error")
  //   }

  //   await updateWriteupService(
  //     updateQuery(writeup.writeupId, "writeup"),
  //     baseResubmitUpdateBody(nextContent, currentContent, 0)
  //   )

  //   return trpcSuccess(true, "Successfully submitted")
  // } 

  if ( writeup.request.members.length-1===currentContent.submissions?.length ) {

    if ( currentContent.reSubmit ) {
      const nextContent = writeup.content[1]
  
      if ( !nextContent ) {
        return trpcError("INTERNAL_SERVER_ERROR", "Server error")
      }
  
      await updateWriteupService(
        updateQuery(writeup.writeupId, "writeup"),
        baseResubmitUpdateBody(nextContent, currentContent, 0)
      )
  
      return trpcSuccess(true, "Successfully submitted")
    } 

    await updateWriteupService(
      updateQuery(writeup.writeupId, "writeup"),
      Object.assign(baseSubmitUpdateBody(0), { "content.1": Object.assign( writeup.content[0], { 
        phase: "revision",
        reSubmit: false,
        notes: [] 
      } ),})
    )
  }
  
  await updateWriteupService(
    updateQuery(writeup.writeupId, "writeup"),
    {
      $push: {
        "content.$.submissions": staff._id
      }
    }
  )
  
  return trpcSuccess(true, "Successfully submitted")
}

export const cancelWriteupSubmissionHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) =>{
  const writeup = await populateWriteupHelper(writeupId, staff._id)

  if ( !writeup.content[0].submissions?.find(member => member.equals(staff._id)) ) {
    return trpcError("CONFLICT", "You can only cancel when you made a submission.")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, "writeup"),
    {
      $pull: {
        "content.$.submissions": staff._id
      }
    }
  )

  return trpcSuccess(true, "Successfully cancelled submission")
}

// ----Verified Editors----

export const takeWriteupTaskHandler = async(writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext) =>{
  const { writeup, currentContent } = await findWriteupHelper(writeupId)

  if ( writeup.currentPhase==="finalization" && staff.position.role=="writer") {
    return trpcError("FORBIDDEN", "Only section and senior editors are allowed for the finalization")
  }

  if ( currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("CONFLICT", "Already taken this task")
  }

  if ( currentContent.handledBy ) {
    return trpcError("CONFLICT", "Someone has already taken this task")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, writeup.currentPhase),
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
  const { writeup, currentContent } = await findWriteupHelper(writeupBody.writeupId)
  const graphicsUpdate = writeup.currentPhase==="graphics"? { banner: writeupBody.banner } : {}

  if ( currentContent?.requestedResubmit ) {
    return trpcError("CONFLICT", "You can only save when resubmission of lower phase is done")
  }

  if ( !currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only editor that took the task is allowed")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, writeup.currentPhase),
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
    const nextContent = writeup.content[phaseIndex+1]

    if ( !nextContent ) {
      return trpcError("INTERNAL_SERVER_ERROR", "Server error")
    }

    await updateWriteupService(
      updateQuery(writeup.writeupId, writeup.currentPhase),
      baseResubmitUpdateBody(nextContent, currentContent, phaseIndex)
    )

    return trpcSuccess(true, "Successfully submitted")
  } 

  const { handledBy, ...restContent } = currentContent
  await updateWriteupService(
    updateQuery(writeup.writeupId, writeup.currentPhase),
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

  if ( currentContent.requestedResubmit ) {
    return trpcError("CONFLICT", "Wait for the re-submission to be finished before requesting again")
  }

  const previousContent = writeup.content[phaseIndex-1]

  if ( !previousContent ) {
    return trpcError("INTERNAL_SERVER_ERROR", "Server error")
  }

  if ( previousContent.isAccepted ) {
    return trpcError("CONFLICT", "Re-submit is not allowed when you submitted your task. Take responsibility")
  }

  const previousNotes = writeup.content[phaseIndex-1]?.notes??[]

  await updateWriteupService(
    {
      writeupId: reSubmitBody.writeupId,
      "content.phase": WRITEUP_PHASES[phaseIndex-1]
    },
    Object.assign(
      {
        "content.$.isSubmitted": false,
        "content.$.reSubmit": true,
        "content.$.notes": previousNotes.concat(reSubmitBody.notes),
        currentPhase: WRITEUP_PHASES[phaseIndex-1]
      },
      isContentWriteupPhase(previousContent)? { "content.$.submissions": [] } : undefined
    )
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

export const publishWriteupHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) => {
  const { writeup, phaseIndex, currentContent } = await findWriteupHelper(writeupId)

  if ( writeup.currentPhase!=="finalization" ) {
    return trpcError("CONFLICT", "Writeup can only be published when it currently at finalization phase")
  } 

  if ( !currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("FORBIDDEN", "Only writeup handler can publish the writeup")
  }

  const processTitle = ( title: string ) => (
    title
      .split(" ")
      .map(word => word.toLowerCase())
      .join("-")
  )

  const foundArticle = await findArticleService(
    { linkPath: processTitle(currentContent.title) },
    "_id",
    { lean: true }
  )

  if ( foundArticle ) {
    return trpcError("CONFLICT", "Article with the same title is already published")
  }

  const articleCategory = await findArticleCategoryService({})

  if ( !articleCategory ) {
    await createArticleCategoryService(writeup.category)
  } else {
    const foundCategory = articleCategory.categories.find(category => category===writeup.category)
  
    if ( !foundCategory ) {
      await addArticleCategoryService(writeup.category)
    }
  }

  const storyRequest = storyRequestValidator(await findStoryRequestService({ _id: writeup.request }))

  const resizer = async( width: number, height: number ) => {
    const uri = writeup.banner.url.split(';base64,').pop() as string
    let imageBuffer = Buffer.from(uri, "base64")
    const result = await sharp(imageBuffer)
      .resize(width, height)
      .toBuffer()
    return `data:image/png;base64,${result.toString('base64')}`
  } 

  const createdArticle = await createArticleService(
    {
      category: writeup.category,
      linkPath: processTitle(currentContent.title),
      authors: storyRequest.members,
      title: currentContent.title,
      caption: currentContent.caption,
      banner: writeup.banner,
      thumbnail: {
        small: await resizer(272, 200),
        medium: await resizer(520, 320)
      },
      content: currentContent.data,
      writeup: writeup._id,
      views: 0
    }
  )

  await updateWriteupService(
    updateQuery(writeup.writeupId, writeup.currentPhase),
    {
      isPublished: true,
      "content.$.isSubmitted": true,
      [`content.${ phaseIndex-1 }.isAccepted`]: true,
      article: createdArticle._id
    }
  )

  return trpcSuccess(true, "Article has been successfully published")
}