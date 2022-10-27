import { 
  TypeOf,
  z } from "zod";


export const writeupIdSchema = z
  .string({ required_error: "Writeup Id is required" })
  .min(1, "Writeup Id should not be empty")
  
export const activitiesTabSchema = z.enum(["", "writeup", "revision", "finalEdit", "graphics", "finalization"])
export const writingsTabSchema = z.enum(["", "solo", "collaborated", "tasks"])

export const saveWriteupSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title should not be empty"),
    caption: z.string({ required_error: "Caption is required" }),
    banner: z.string().optional(),
    content: z.array(z.any()),
    writeupId: writeupIdSchema,
  })

export const saveWriteupPhaseSchema = saveWriteupSchema.omit({ banner: true })

export const submitWriteupSchema = z
  .object({
    writeupId: writeupIdSchema,
  })

export type WriteupIdSchema = TypeOf<typeof writeupIdSchema>
export type SaveWriteupSchema = TypeOf<typeof saveWriteupSchema>;
export type ActivitiesTabSchema = TypeOf<typeof activitiesTabSchema>;
export type WritingsTabSchema = TypeOf<typeof writingsTabSchema>
export type SubmitWriteupSchema = TypeOf<typeof submitWriteupSchema>
export type SaveWriteupPhaseSchema = TypeOf<typeof saveWriteupPhaseSchema>