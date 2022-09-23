import { 
  TypeOf,
  z } from "zod";


export const writeupIdSchema = z
  .string({ required_error: "Writeup Id is required" })
  .min(1, "Writeup Id should not be empty")

export const saveWriteupSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title should not be empty"),
    caption: z.string({ required_error: "Caption is required" }),
    banner: z.string({ required_error: "Banner is required" }),
    content: z.array(z.any()),
    writeupId: writeupIdSchema,
    phase: z
    .string({ required_error: "Phase is required" })
    .min(1, "Phase should not be empty")
  })

export const writeupPhaseSchema = z
  .object({ phase: z.string({ required_error: "Writeup phase is required" }) })

export type WriteupIdSchema = TypeOf<typeof writeupIdSchema>
export type SaveWriteupSchema = TypeOf<typeof saveWriteupSchema>;
export type WriteupPhaseSchema = TypeOf<typeof writeupPhaseSchema>;