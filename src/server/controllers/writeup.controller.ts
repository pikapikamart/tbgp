import { StaffContext } from "../middlewares/router.middleware";
import { 
  SaveWriteupSchema, 
  WriteupIdWithPhaseSchema } from "../schemas/writeup.schema";
import { updateWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { 
  apiResult, 
  apiResultWithData } from "../utils/success.util";
import { getSingleWriteup } from "./controller.utils";


export const getWriteupHandler = async( { writeupId, phase }: WriteupIdWithPhaseSchema ) => {
  const writeup = await getSingleWriteup(
    { phase, writeupId },
    "",
    {
      path: "writings.request",
      select: "-_id -requests -assignedmembers",
      populate: {
        path: "owner members",
        select: "-_id firstname lastname bastionId"
      }
    }
  );

  return apiResultWithData(true, writeup.writings[0]);
}

export const editWriteupHandler = async( { writeupId, phase }: WriteupIdWithPhaseSchema, { staff }: StaffContext ) => {
  const writeup = await getSingleWriteup({ phase, writeupId });

  if ( writeup.writings[0].isEditingBy ) {
    return trpcError("BAD_REQUEST", "Someone is already editing, wait for it to finish")
  }
  
  await updateWriteup(
    {
      phase,
      "writings.writeupId": writeupId
    },
    { "writings.$.isEditingBy": staff.bastionId }
  )

  return apiResult("You can now edit the write up", true);
}

export const saveWriteupHandler = async( writeupBody: SaveWriteupSchema, { staff }: StaffContext ) => {
  await getSingleWriteup(
    {
      phase: writeupBody.phase,
      writeupId: writeupBody.writeupId
    }
  );
  
  const updatedWriteup = await updateWriteup(
    {
      phase: writeupBody.phase,
      "writings.writeupId": writeupBody.writeupId,
      "writings.isEditingBy": staff.bastionId
    },
    {
      "writings.$.title": writeupBody.title,
      "writings.$.caption": writeupBody.caption,
      "writings.$.banner": writeupBody.banner,
      $set: {
        [`writings.$.content.${ writeupBody.phase }`]: writeupBody.content
      }
    }
  )

  if ( !updatedWriteup ) {
    return trpcError("BAD_REQUEST", "Someone is already editing this writeup, wait for them to finish")
  }

  return apiResult("Successfully saved writeup", true);
}