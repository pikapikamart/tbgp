import { 
  acceptStoryRequestHandler, 
  applyStoryRequestHandler, 
  createStoryRequestHandler, 
  deleteStoryRequestHandler,
  startStoryRequestHandler,
  getMultipleStoryRequestsHandler, 
  getStoryRequestHandler,
  getMultipleAssignedStoryRequestsHandler,
  getMultipleCreatedStoryRequestHandler } from "../controllers/story.request.controller";
import { 
  isValidStaff, 
  isVerifiedStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  acceptStoryRequestSchema,
  storyRequestIdSchema, 
  storyRequestSchema } from "../schemas/story.request.schema";


export const storyRequestRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => getStoryRequestHandler(input, ctx)
  })
  .query("get-multiple", {
    resolve: () => getMultipleStoryRequestsHandler()
  })
  .query("get-multiple-assigned", {
    resolve: () => getMultipleAssignedStoryRequestsHandler()
  })
  .mutation("create", {
    input: storyRequestSchema,
    resolve: ({ input, ctx }) => createStoryRequestHandler(input, ctx)
  })
  .middleware(({ ctx, next }) => isVerifiedStaff(ctx, next))
  .query("get-multiple-created", {
    resolve: ({ ctx }) => getMultipleCreatedStoryRequestHandler(ctx)
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
