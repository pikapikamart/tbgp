import { applyStoryRequestHandler, createStoryRequestHandler } from "../controller/story.request.controller";
import { createRouter } from "../router/createRouter";
import { 
  applyStoryRequestSchema, 
  storyRequestSchema } from "../schema/story.request.schema";


export const storyRequestRouter = createRouter()
  .mutation("create", {
    input: storyRequestSchema,
    resolve: ({ input }) => createStoryRequestHandler(input)
  })
  .mutation("apply", {
    input: applyStoryRequestSchema,
    resolve: ({ input }) => applyStoryRequestHandler(input)
  })