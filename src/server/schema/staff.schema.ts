import { TypeOf, z } from "zod";
import { baseUserSchema } from "./shared.schema";


export const registerIdSchema = z.string({ required_error: "Bastion Id is required" });

export const createStaffSchema = z
  .object({
    firstname: z.string({ required_error:"Firstname is required" }),
    lastname: z.string({ required_error: "Lastname is required" }),
    bastionId: z.string({ required_error: "Bastion Id should be passed" })
  })
  .merge(baseUserSchema);

export type RegisterIdSchema = TypeOf<typeof registerIdSchema>;
export type CreateStaffSchema = TypeOf<typeof createStaffSchema>;