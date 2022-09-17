import { StaffContext } from "../middlewares/router.middleware";
import { WriteupIdWithPhaseSchema } from "../schemas/writeup.schema";
import { updateWriteup } from "../services/writeup.service";
import { trpcError } from "../utils/error.util";
import { apiResult, apiResultWithData } from "../utils/success.util";
import { getSingleWriteup } from "./controller.utils";


export const getWriteupHandler = async( { writeupId, phase }: WriteupIdWithPhaseSchema ) => {
  const writeup = await getSingleWriteup(
    {
      phase,
      "writings.writeupId": writeupId
    },
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
  const updatedWriteup = await updateWriteup(
    {
      phase,
      "writings.writeupId": writeupId
    },
    { "writings.$.isEditing": true }
  )

  if ( !updatedWriteup ) {
    return trpcError("BAD_REQUEST", "Please supply a valid phase and writeup Id")
  }

  return apiResult("You can now edit the write up", true);
}