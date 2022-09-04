import { TypeOf, z } from "zod";
import { baseUserSchema } from "./shared.schema";


export const registerIdSchema = z.string({ required_error: "Bastion Id is required" });

export const createStaffSchema = z
  .object({
    firstname: z.string({ required_error:"Firstname is required" }),
    lastname: z.string({ required_error: "Lastname is required" }),
    bastionId: z.string({ required_error: "Bastion Id is required" })
  })
  .merge(baseUserSchema);

export const verifyPositionSchema = z
  .object({
    bastionId: z.string({ required_error: "Bastion Id is required" }),
    position: z.string({ required_error: "Position is required" })
  })

export type RegisterIdSchema = TypeOf<typeof registerIdSchema>;
export type CreateStaffSchema = TypeOf<typeof createStaffSchema>;
export type VerifyPositionSchema = TypeOf<typeof verifyPositionSchema>;