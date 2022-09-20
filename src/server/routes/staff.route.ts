import { 
  registerStaffHandler, 
  validateBastionIdHandler, 
  requestPositionHandler, 
  validateStaffHandler,
  getStaffHandler,
  updateStaffHandler,
  populateStaffStoryRequests,
  populateStaffWriteups} from "../controllers/staff.controller";
import { isValidStaff, isVerifiedStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { baseUserSchema } from "../schemas/base.user.schema";
import { 
  staffSchema, 
  bastionIdSchema, 
  positionSchema,
  updateStaffSchema,
  staffWritingsSchema} from "../schemas/staff.schema";


export const staffRouter = createRouter()
  .query("validate-bastionId", ({
    input: bastionIdSchema,
    resolve: ({ input }) => validateBastionIdHandler(input)
  }))
  .query("validate", {
    input: baseUserSchema, 
    resolve: ({ input }) => validateStaffHandler(input)
  })
  .mutation("register", {
    input: staffSchema,
    resolve: ({ input }) => registerStaffHandler(input)
  })
  // authentication
  .middleware(async ({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: bastionIdSchema,
    resolve: ({ input, ctx }) => getStaffHandler(input, ctx)
  })
  .mutation("request-position", {
    input: positionSchema,
    resolve: ({ input, ctx }) => requestPositionHandler(input, ctx)
  })
  .mutation("edit", {
    input: updateStaffSchema,
    resolve: ({ input, ctx }) => updateStaffHandler(input, ctx)
  })
  .middleware(async ({ ctx, next }) => isVerifiedStaff(ctx, next))
  .query("populate-storyRequests", {
    resolve: ({ ctx }) => populateStaffStoryRequests(ctx)
  })
  .query("populate-writeups", {
    resolve: ({ ctx }) => populateStaffWriteups(ctx)
  })