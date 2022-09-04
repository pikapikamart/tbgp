import { createStaffHandler, registerIdHandler } from "../controller/staff.controller";
import { createRouter } from "../router/createRouter";
import { 
  createStaffSchema, 
  registerIdSchema } from "../schema/staff.schema";


export const staffRouter = createRouter()
  .query("register-id", ({
    input: registerIdSchema,
    resolve: ({ input }) => registerIdHandler(input)
  }))
  .mutation("create-account", {
    input: createStaffSchema,
    resolve: ({ input }) => createStaffHandler(input)
  })