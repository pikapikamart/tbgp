import { 
  TypeOf, 
  z } from "zod";


export const storyRequestSchema = z
  .object({
    bastionId: z.string({ required_error: "Bastion Id is required" }),
    title: z.string({ required_error: "Title is required" }),
    category: z.string({ required_error: "Category is required" }),
    instruction: z.string({ required_error: "Instruction is required" }),
    assignedMembers: z.array(z.string()).optional()
  })

export type StoryRequestSchema = TypeOf<typeof storyRequestSchema>;