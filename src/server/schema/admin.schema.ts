import { TypeOf, z } from "zod";
import { baseUserSchema } from "./shared.schema";


export const createAdminSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }),
  })
  .merge(baseUserSchema);

export const verifyPositionSchema = z
  .object({
    bastionId: z.string({ required_error: "Bastion Id is required" }),
    position: z.string({ required_error: "Position is required" })
  })

export type CreateAdminSchema = TypeOf<typeof createAdminSchema>;
export type VerifyPositionSchema = TypeOf<typeof verifyPositionSchema>;