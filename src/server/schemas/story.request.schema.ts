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

export const storyRequestIdSchema = z
  .object({
    id: z.string({ required_error: "Story request id is required" })
  })

export const acceptStoryRequestSchema = z
  .object({
    id: z.string({ required_error: "Story request id is required" }),
    bastionId: z.string({ required_error: "Bastion Id is required" }),
  })

export type StoryRequestSchema = TypeOf<typeof storyRequestSchema>;
export type StoryRequestIdSchema = TypeOf<typeof storyRequestIdSchema>;
export type AcceptStoryRequestSchema = TypeOf<typeof acceptStoryRequestSchema>;