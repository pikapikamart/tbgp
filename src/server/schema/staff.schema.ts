import { TypeOf, z } from "zod";
import { baseUserSchema } from "./shared.schema";


export const registerIdSchema = z.string({ required_error: "Bastion Id is required" });

export const createStaffSchema = z
  .object({
    firstName: z.string({ required_error:"Firstname is required" }),
    lastName: z.string({ required_error: "Lastname is required" })
  })
  .merge(baseUserSchema);

export type RegisterIdSchema = TypeOf<typeof registerIdSchema>;