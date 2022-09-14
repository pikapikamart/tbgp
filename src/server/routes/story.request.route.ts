import { 
  acceptStoryRequestHandler, 
  applyStoryRequestHandler, 
  createStoryRequestHandler, 
  deleteStoryRequestHandler,
  startStoryRequestHandler} from "../controllers/story.request.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  acceptStoryRequestSchema,
  storyRequestIdSchema, 
  storyRequestSchema } from "../schemas/story.request.schema";


export const storyRequestRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .mutation("create", {
    input: storyRequestSchema,
    resolve: ({ input, ctx }) => createStoryRequestHandler(input, ctx)
  })
  .mutation("apply", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => applyStoryRequestHandler(input, ctx)
  })
  .mutation("accept", {
    input: acceptStoryRequestSchema,
    resolve: ({ input, ctx }) => acceptStoryRequestHandler(input, ctx)
  })
  .mutation("delete", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => deleteStoryRequestHandler(input, ctx)
  })
  .mutation("start", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => startStoryRequestHandler(input, ctx)
  })