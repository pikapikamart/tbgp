import { 
  TypeOf, 
  z } from "zod";
import { baseUserSchema } from "./base.user.schema";


export const adminSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }),
  })
  .merge(baseUserSchema);

export const verifyStaffSchema = z
  .object({
    bastionId: z.string({ required_error: "Position is required" }),
    accepted: z.boolean(),
  })

export type AdminSchema = TypeOf<typeof adminSchema>;
export type VerifyStaffSchema = TypeOf<typeof verifyStaffSchema>;