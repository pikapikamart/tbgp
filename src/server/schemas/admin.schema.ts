import { 
  TypeOf, 
  z } from "zod";
import { baseUserSchema } from "./base.user.schema";
import { 
  bastionIdSchema, 
  positionSchema } from "./staff.schema";


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

export const editStaffPositionSchema = z
  .object({
    bastionID: bastionIdSchema
  })
  .merge(positionSchema)

export type AdminSchema = TypeOf<typeof adminSchema>;
export type VerifyStaffSchema = TypeOf<typeof verifyStaffSchema>;
export type EditStaffPositionSchema = TypeOf<typeof editStaffPositionSchema>