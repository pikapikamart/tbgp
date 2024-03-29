import { 
  InitialWriteup, 
  StaffProfile } from "@/store/store.types";
import { VerifiedStaffContext } from "../middlewares/router.middleware";
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
import { 
  createArticleService, 
  findArticleService } from "../services/article.service";
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
import sharp from "sharp"
import axios from "axios"


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

export const getCurrentPhTime = async() =>{
  const asiaManilaRequest = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Manila")

  return new Date(asiaManilaRequest.data.datetime)
}

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
        submittedDate: undefined,
        submissions: []
      },
      !isContentWriteupPhase(nextContent)? { 
        handledBy: nextContent.handledBy,
        handledDate: nextContent.handledDate } : undefined,
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
      $sort: { createdAt: -1 }
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
    owner: StaffProfile,
    members: {
      member: StaffProfile,
      date: Date
    }[],
    title: string,
    category: string,
    instruction: string,
    createdAt: string,
    deadline: string
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
    requestedResubmit: boolean,
    handledBy?: StaffProfile,
    handledDate?: Date,
    submissions?: {
      member: StaffProfile,
      date: Date
    }[],
    submittedDate?: Date
  }]
}

export const getWriteupHandler = async( query: SingleWriteupSchema ) => {
  const writeup = writeupValidator(await findWriteupPopulatorService(
    {
      writeupId: query.writeupId,
      "content.phase": query.phase
    },
    {
      path: "request",
      select: "-_id owner members title category instruction content.$ createdAt deadline",
      populate: {
        path: "members.member owner",
        select: "-_id firstname lastname username bastionId"
      }
    },
    "-_id request writeupId banner content.$ currentPhase"
  ))

  await writeupPopulatorService(writeup, {
    path: "content.handledBy content.submissions.member",
    select: "-_id firstname lastname username bastionId"
  })

  return trpcSuccess(true, (writeup as never) as PopulatedWriteup)
}

// --------Mutations--------

export const saveWriteupPhaseHandler = async(writeupBody: SaveWriteupPhaseSchema, { staff }: VerifiedStaffContext) =>{
  const writeup = await populateWriteupHelper(writeupBody.writeupId, staff._id)
  
  if ( writeup.request.members.length > 1 && writeup.content[0].submissions?.find(({ member }) => member.equals(staff._id)) ) {
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
  const currentTime = await getCurrentPhTime()

  if ( writeup.request.members.length > 1 && writeup.content[0].submissions?.find(({ member }) => member.equals(staff._id)) ) {
    return trpcError("FORBIDDEN", "Already submitted your work")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, "writeup"),
    {
      $push: {
        "content.$.submissions": {
          member: staff._id,
          date: currentTime
        }
      }
    }
  )

  if ( writeup.request.members.length-1===currentContent.submissions?.length ) {

    if ( currentContent.reSubmit ) {
      const nextContent = writeup.content[1]
  
      if ( !nextContent ) {
        return trpcError("INTERNAL_SERVER_ERROR", "Server error")
      }

      await updateWriteupService(
        updateQuery(writeup.writeupId, "writeup"),
        Object.assign({ "content.0.submittedDate": currentTime }, baseResubmitUpdateBody(nextContent, currentContent, 0))
      )
  
      return trpcSuccess(true, currentTime)
    } 

    await updateWriteupService(
      updateQuery(writeup.writeupId, "writeup"),
      Object.assign(
        baseSubmitUpdateBody(0), 
        { "content.0.submittedDate": currentTime },
        { "content.1": Object.assign(writeup.content[0], { 
            phase: "revision",
            reSubmit: false,
            notes: [],
            submissions: [],
            submittedDate: undefined
          })
        }
      )
    )
  }
  
  return trpcSuccess(true, currentTime)
}

export const cancelWriteupSubmissionHandler = async( writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext ) =>{
  const writeup = await populateWriteupHelper(writeupId, staff._id)

  if ( !writeup.content[0].submissions?.find(({ member }) => member.equals(staff._id)) ) {
    return trpcError("CONFLICT", "You can only cancel when you made a submission.")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, "writeup"),
    {
      $pull: {
        "content.$.submissions": {
          member: staff._id
        }
      }
    }
  )

  return trpcSuccess(true, "Successfully cancelled submission")
}

// ----Verified Editors----

export const takeWriteupTaskHandler = async(writeupId: WriteupIdSchema, { staff }: VerifiedStaffContext) =>{
  const { writeup, currentContent } = await findWriteupHelper(writeupId)
  const currentTime = await getCurrentPhTime()

  if ( writeup.currentPhase==="finalization" && staff.position.name!=="Editor in Chief") {
    return trpcError("FORBIDDEN", "Only Editor in Chief can take the finalization phase")
  }

  if ( currentContent.handledBy?.equals(staff._id) ) {
    return trpcError("CONFLICT", "Already taken this task")
  }

  if ( currentContent.handledBy ) {
    return trpcError("CONFLICT", "Someone has already taken this task")
  }

  await updateWriteupService(
    updateQuery(writeup.writeupId, writeup.currentPhase),
    { 
      "content.$.handledBy" : staff._id,
      "content.$.handledDate": currentTime
    }
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

  return trpcSuccess(true, currentTime)
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
  const currentTime = await getCurrentPhTime()

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
      Object.assign({ "content.$.submittedDate": currentTime }, baseResubmitUpdateBody(nextContent, currentContent, phaseIndex))
    )

    return trpcSuccess(true, currentTime)
  } 

  const { handledBy, ...restContent } = currentContent
  await updateWriteupService(
    updateQuery(writeup.writeupId, writeup.currentPhase),
    Object.assign(
      baseSubmitUpdateBody(phaseIndex), 
      {
        [`content.${ phaseIndex-1 }.isAccepted`]: true,
        [`content.${ phaseIndex }.submittedDate`]: currentTime,
        [`content.${ phaseIndex+1 }`]: Object.assign( restContent, { phase: WRITEUP_PHASES[phaseIndex+1] } ),
      })
  )

  return trpcSuccess(true, currentTime)
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
        $unset: {
          "content.$.submittedDate": ""
        },
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
      .split(/[,.' -]+/)
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
      authors: storyRequest.members.map(({ member }) => member),
      title: currentContent.title,
      caption: currentContent.caption,
      banner: writeup.banner,
      thumbnail: {
        small: await resizer(272, 200),
        medium: await resizer(520, 320)
      },
      content: currentContent.data,
      writeup: writeup._id,
      views: 0,
      viewsId: []
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