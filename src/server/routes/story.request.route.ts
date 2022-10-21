import { 
  acceptRejectStoryRequestHandler, 
  applyStoryRequestHandler, 
  createStoryRequestHandler, 
  deleteStoryRequestHandler,
  startStoryRequestHandler,
  getMultipleStoryRequestsHandler, 
  getStoryRequestHandler } from "../controllers/story.request.controller";
import { 
  isStaffEditor,
  isValidStaff, 
  isVerifiedStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  acceptRejectStoryRequestSchema,
  storyRequestIdSchema, 
  storyRequestSchema,
  storyRequestTabSchema } from "../schemas/story.request.schema";


export const storyRequestRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => getStoryRequestHandler(input, ctx)
  })
  .query("get-multiple", {
    input: storyRequestTabSchema,
    resolve: ({ ctx, input }) => getMultipleStoryRequestsHandler(input, ctx)
  })
  // verification
  .middleware(({ ctx, next }) => isVerifiedStaff(ctx, next))
  .mutation("apply", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => applyStoryRequestHandler(input, ctx)
  })
  // verification
  .middleware(({ ctx, next }) => isStaffEditor(ctx, next))
  .mutation("create", {
    input: storyRequestSchema,
    resolve: ({ input, ctx }) => createStoryRequestHandler(input, ctx)
  })
  .mutation("accept-reject", {
    input: acceptRejectStoryRequestSchema,
    resolve: ({ input, ctx }) => acceptRejectStoryRequestHandler(input, ctx)
  })
  .mutation("delete", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => deleteStoryRequestHandler(input, ctx)
  })
  .mutation("start", {
    input: storyRequestIdSchema,
    resolve: ({ input, ctx }) => startStoryRequestHandler(input, ctx)
  })
