import { TypeOf, z } from "zod";
import { baseUserSchema } from "./shared.schema";


export const createAdminSchema = z
  .object({
    username: z.string({ required_error: "Username is required." }),
  })
  .merge(baseUserSchema);

export type CreateAdminSchema = TypeOf<typeof createAdminSchema>;