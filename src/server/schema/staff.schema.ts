import { TypeOf, z } from "zod";
import { baseUserSchema } from "./schema.shared";


export const bastionIdSchema = z.string({ required_error: "Bastion Id is required" });

export const staffSchema = z
  .object({
    firstname: z.string({ required_error:"Firstname is required" }),
    lastname: z.string({ required_error: "Lastname is required" }),
    bastionId: z.string({ required_error: "Bastion Id is required" })
  })
  .merge(baseUserSchema);

export type BastionIdSchema = TypeOf<typeof bastionIdSchema>;
export type StaffSchema = TypeOf<typeof staffSchema>;