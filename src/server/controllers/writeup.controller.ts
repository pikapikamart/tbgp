import { WriteupIdWithPhaseSchema } from "../schemas/writeup.schema";
import { apiResultWithData } from "../utils/success.util";
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