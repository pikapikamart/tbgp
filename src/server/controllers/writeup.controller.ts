import { StaffContext } from "../middlewares/router.middleware";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema,
  WriteupPhaseSchema} from "../schemas/writeup.schema";
import { 
  findMultipleWriteupAggregator, 
  updateWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { 
  apiResult, 
  trpcSuccess } from "../utils/success.util";
import { 
  getSingleOwnedWriteup, 
  getSingleWriteup } from "./controller.utils";


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

export const getMultipleWriteupHandler = async({ phase }: WriteupPhaseSchema) =>{
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
          $arrayElemAt: [ "$content", 0 ]
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

  return trpcSuccess(true, aggregatedWriteups)
}

// --------Mutations--------

export const saveWriteupHandler = async( writeupBody: SaveWriteupSchema, { staff }: StaffContext ) => {
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