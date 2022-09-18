import { StaffContext } from "../middlewares/router.middleware";
import { 
  SaveWriteupSchema, 
  WriteupIdSchema} from "../schemas/writeup.schema";
import { updateWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { 
  apiResult, 
  apiResultWithData } from "../utils/success.util";
import { 
  getSingleOwnedWriteup, 
  getSingleWriteup } from "./controller.utils";


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

  return apiResultWithData(true, writeup);
}

export const editWriteupHandler = async( writeupId: WriteupIdSchema, { staff }: StaffContext ) => {
  const writeup = await getSingleOwnedWriteup(
    { writeupId }, 
    staff
  );

  if ( writeup.isEditingBy ) {
    return trpcError("CONFLICT", "Someone is already editing, wait for it to finish")
  }

  await updateWriteup(
    { writeupId },
    { isEditingBy: staff.bastionId }
  )

  return apiResult("You can now edit the write up", true);
}

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

export const exitWriteupHandler = async( writeupId: WriteupIdSchema, { staff }: StaffContext ) => {
  const writeup = await getSingleOwnedWriteup(
    { writeupId },
    staff  
  );

  if ( writeup.isEditingBy!==staff.bastionId ) {
    return trpcError("FORBIDDEN", "You can only terminate editing if you are the current editor")
  }

  await updateWriteup(
    { writeupId },
    { isEditingBy: "" }
  )

  return apiResult("Successfully exited editing writeup", true);
}