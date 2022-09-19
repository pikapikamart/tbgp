import { 
  registerStaffHandler, 
  validateBastionIdHandler, 
  requestPositionHandler, 
  validateStaffHandler,
  getStaffHandler} from "../controllers/staff.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { baseUserSchema } from "../schemas/base.user.schema";
import { 
  staffSchema, 
  bastionIdSchema, 
  requestPositionSchema} from "../schemas/staff.schema";


export const staffRouter = createRouter()
  .query("validate-bastionId", ({
    input: bastionIdSchema,
    resolve: ({ input }) => validateBastionIdHandler(input)
  }))
  
  .mutation("register", {
    input: staffSchema,
    resolve: ({ input }) => registerStaffHandler(input)
  })
  // for signin, validate first before creating session
  // this way, we can use ui error for client side
  .mutation("validate", {
    input: baseUserSchema, 
    resolve: ({ input }) => validateStaffHandler(input)
  })
  // authentication checking
  .middleware(async ({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: bastionIdSchema,
    resolve: ({ input, ctx }) => getStaffHandler(input, ctx)
  })
  .mutation("request-position", {
    input: requestPositionSchema,
    resolve: ({ input, ctx }) => requestPositionHandler(input, ctx)
  })
