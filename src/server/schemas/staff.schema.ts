import { 
  TypeOf, 
  z } from "zod";
import { baseUserSchema } from "./base.user.schema";


export const bastionIdSchema = z.string({ required_error: "Bastion Id is required" })

const staffNameSchema = z
  .object({
    firstname: z
      .string({ required_error:"Firstname is required" })
      .min(1, "Firstname should not be empty"),
    lastname: z
      .string({ required_error: "Lastname is required" })
      .min(1, "Lastname should not be empty"),
  })

export const staffSchema = z
  .object({
    bastionId: bastionIdSchema
  })
  .merge(baseUserSchema)
  .merge(staffNameSchema)

export const positionSchema = z
  .object({
    position: z.string({ required_error: "Position is required" })
  })

export const updateStaffSchema = z
  .object({
    bio: z.string({ required_error: "Bio is required" })
  })
  .merge(staffNameSchema)

export const staffWritingsSchema = z
  .string({ required_error: "Writings is required" })
  .min(1, "Writings should not be empty")

export type BastionIdSchema = TypeOf<typeof bastionIdSchema>;
export type StaffSchema = TypeOf<typeof staffSchema>;
export type PositionSchema = TypeOf<typeof positionSchema>;
export type UpdateStaffaSchema = TypeOf<typeof updateStaffSchema>;
export type StaffWritingsSchema = TypeOf<typeof staffWritingsSchema>;