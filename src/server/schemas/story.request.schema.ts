import { 
  TypeOf, 
  z } from "zod";
import { bastionIdSchema } from "./staff.schema";


export const storyRequestSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title should not be empty"),
    category: z
      .string({ required_error: "Category is required" })
      .min(1, "Category should not be empty"),
    instruction: z
      .string({ required_error: "Instruction is required" })
      .min(1, "Instruction should not be empty"),
    assignedMembers: z.array(bastionIdSchema).optional()
  })

export const storyRequestIdSchema = z
  .object({
    storyRequestId: z
      .string({ required_error: "Story request's Id is required" })
      .min(1, "Story request's Id should not be empty")
  })

export const acceptStoryRequestSchema = z
  .object({
    bastionId: z
      .string({ required_error: "Bastion Id is required" })
      .min(1, "Bastion Id should not be empty"),
  })
  .merge(storyRequestIdSchema)

export const storyRequestTabSchema = z.enum(["open", "assigned", "created", ""])

export type StoryRequestSchema = TypeOf<typeof storyRequestSchema>;
export type StoryRequestIdSchema = TypeOf<typeof storyRequestIdSchema>;
export type AcceptStoryRequestSchema = TypeOf<typeof acceptStoryRequestSchema>;
export type StoryRequestTabSchema = TypeOf<typeof storyRequestTabSchema>