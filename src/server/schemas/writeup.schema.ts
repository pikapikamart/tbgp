import { 
  TypeOf,
  z } from "zod";


export const writeupIdSchema = z.string({ required_error: "Writeup Id is required" })

export const writeupIdWithPhaseSchema = z
.object({
  writeupId: writeupIdSchema,
  phase: z.string({ required_error: "Phase is required" })
})


export type WriteupIdSchema = TypeOf<typeof writeupIdSchema>
export type WriteupIdWithPhaseSchema = TypeOf<typeof writeupIdWithPhaseSchema>;