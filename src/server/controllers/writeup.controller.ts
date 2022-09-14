import { WriteupIdSchema } from "../schemas/writeup.schema";
import { getSingleWriteup } from "./controller.utils";


export const getWriteupHandler = async( writeupId: WriteupIdSchema ) => {
  const writeup = await getSingleWriteup(writeupId);

}