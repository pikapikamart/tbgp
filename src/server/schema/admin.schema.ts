import { TypeOf, z } from "zod";
import { baseUserSchema } from "./shared.schema";


export const adminSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }),
  })
  .merge(baseUserSchema);

export const positionSchema = z
  .object({
    bastionId: z.string({ required_error: "Bastion Id is required" }),
    position: z.string({ required_error: "Position is required" })
  })

export type AdminSchema = TypeOf<typeof adminSchema>;
export type PositionSchema = TypeOf<typeof positionSchema>;