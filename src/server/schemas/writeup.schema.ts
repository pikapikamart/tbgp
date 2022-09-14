import { 
  TypeOf,
  z, 
  ZodTypeAny} from "zod";


export const writeupIdWithPhaseSchema = z
.object({
  writeupId: z.string({ required_error: "Writeup Id is required" }),
  phase: z.string({ required_error: "Phase is required" })
})

export type WriteupIdWithPhaseSchema = TypeOf<typeof writeupIdWithPhaseSchema>;