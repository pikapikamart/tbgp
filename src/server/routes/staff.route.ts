import { 
  createStaffHandler, 
  registerBastionIdHandler, 
  requestPositionHandler, 
  validateStaffHandler} from "../controllers/staff.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { baseUserSchema } from "../schemas/schema.shared";
import { 
  staffSchema, 
  bastionIdSchema, 
  requestPositionSchema} from "../schemas/staff.schema";


export const staffRouter = createRouter()
  .query("register-bastionId", ({
    input: bastionIdSchema,
    resolve: ({ input }) => registerBastionIdHandler(input)
  }))
  .mutation("create-staff", {
    input: staffSchema,
    resolve: ({ input }) => createStaffHandler(input)
  })
  .mutation("validate", {
    input: baseUserSchema, 
    resolve: ({ input }) => validateStaffHandler(input)
  })
  // authentication checking
  .middleware(async ({ ctx, next }) => isValidStaff(ctx, next))
  .mutation("request-position", {
    input: requestPositionSchema,
    resolve: ({ input, ctx }) => requestPositionHandler(input, ctx)
  })
