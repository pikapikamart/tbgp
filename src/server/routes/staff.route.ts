import { 
  registerStaffHandler, 
  validateBastionIdHandler, 
  requestStaffPositionHandler, 
  validateStaffHandler,
  getStaffHandler,
  updateStaffHandler,
  getWritingsHandler,
  getProfileHandler,
  getWritersNamesHandler} from "../controllers/staff.controller";
import { 
  isStaffEditor,
  isValidStaff, 
  isVerifiedStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { baseUserSchema } from "../schemas/base.user.schema";
import { 
  staffSchema, 
  bastionIdSchema, 
  positionSchema,
  updateStaffSchema, 
  usernameSchema} from "../schemas/staff.schema";
import { writingsTabSchema } from "../schemas/writeup.schema";


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
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: usernameSchema,
    resolve: ({ input, ctx }) => getStaffHandler(input)
  })
  .query("get-profile", {
    resolve: ({ ctx }) => getProfileHandler(ctx)
  })
  .mutation("request-position", {
    input: positionSchema,
    resolve: ({ input, ctx }) => requestStaffPositionHandler(input, ctx)
  })
  .mutation("edit", {
    input: updateStaffSchema,
    resolve: ({ input, ctx }) => updateStaffHandler(input, ctx)
  })
  // verification
  .middleware(({ ctx, next }) => isVerifiedStaff(ctx, next))
  .query("get-writings", {
    input: writingsTabSchema,
    resolve: ({ ctx, input }) => getWritingsHandler(input, ctx)
  })
  // verification
  .middleware(({ ctx, next }) => isStaffEditor(ctx, next))
  .query("get-writers-name", {
    resolve: ({ ctx }) => getWritersNamesHandler(ctx)
  })