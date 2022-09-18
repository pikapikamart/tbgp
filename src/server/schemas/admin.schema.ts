import { 
  TypeOf, 
  z } from "zod";
import { baseUserSchema } from "./base.user.schema";
import { requestPositionSchema } from "./staff.schema";


export const adminSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }),
  })
  .merge(baseUserSchema);

export const verifyPositionSchema = z
  .object({
    bastionId: z.string({ required_error: "Position is required" })
  })
  .merge(requestPositionSchema)

export type AdminSchema = TypeOf<typeof adminSchema>;
export type VerifyPositionSchema = TypeOf<typeof verifyPositionSchema>;