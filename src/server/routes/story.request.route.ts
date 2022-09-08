import { 
  acceptStoryRequestHandler, 
  applyStoryRequestHandler, 
  createStoryRequestHandler, 
  deleteStoryRequestHandler} from "../controller/story.request.controller";
import { createRouter } from "../router/createRouter";
import { 
  acceptStoryRequestSchema,
  applyStoryRequestSchema, 
  deleteStoryRequestSchema, 
  storyRequestSchema } from "../schema/story.request.schema";


export const storyRequestRouter = createRouter()
  .mutation("create", {
    input: storyRequestSchema,
    resolve: ({ input }) => createStoryRequestHandler(input)
  })
  .mutation("delete", {
    input: deleteStoryRequestSchema,
    resolve: ({ input }) => deleteStoryRequestHandler(input)
  })
  .mutation("apply", {
    input: applyStoryRequestSchema,
    resolve: ({ input }) => applyStoryRequestHandler(input)
  })
  .mutation("accept", {
    input: acceptStoryRequestSchema,
    resolve: ({ input }) => acceptStoryRequestHandler(input)
  })