import { createStaffHandler, registerIdHandler, verifyPositionHandler } from "../controller/staff.controller";
import { createRouter } from "../router/createRouter";
import { 
  createStaffSchema, 
  registerIdSchema, 
  requestVerificationSchema} from "../schema/staff.schema";


export const staffRouter = createRouter()
  .query("register-id", ({
    input: registerIdSchema,
    resolve: ({ input }) => registerIdHandler(input)
  }))
  .mutation("create-account", {
    input: createStaffSchema,
    resolve: ({ input }) => createStaffHandler(input)
  })
  .mutation("verify-position", {
    input: requestVerificationSchema,
    resolve: ({ input }) => verifyPositionHandler(input)
  })