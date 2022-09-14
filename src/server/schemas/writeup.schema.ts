import { 
  TypeOf,
  z } from "zod";


export const writeupIdSchema = z.string({ required_error: "Writeup id is required" })

export type WriteupIdSchema = TypeOf<typeof writeupIdSchema>;