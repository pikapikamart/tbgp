import { 
  TypeOf, 
  z } from "zod";


export const storyRequestSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }),
    category: z.string({ required_error: "Category is required" }),
    instruction: z.string({ required_error: "Instruction is required" }),
    assignedMembers: z.array(z.string()).optional()
  })

export const storyRequestIdSchema = z
  .object({
    storyRequestId: z.string({ required_error: "Story request storyRequestId is required" })
  })

export const acceptStoryRequestSchema = z
  .object({
    bastionId: z.string({ required_error: "Bastion Id is required" }),
  })
  .merge(storyRequestIdSchema)

export type StoryRequestSchema = TypeOf<typeof storyRequestSchema>;
export type StoryRequestIdSchema = TypeOf<typeof storyRequestIdSchema>;
export type AcceptStoryRequestSchema = TypeOf<typeof acceptStoryRequestSchema>;