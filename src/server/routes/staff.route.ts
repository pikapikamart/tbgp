import { 
  createStaffHandler, 
  registerBastionIdHandler, 
  requestPositionHandler } from "../controller/staff.controller";
import { createRouter } from "../router/createRouter";
import { positionSchema } from "../schema/admin.schema";
import { 
  staffSchema, 
  bastionIdSchema } from "../schema/staff.schema";


export const staffRouter = createRouter()
  .query("register-bastionId", ({
    input: bastionIdSchema,
    resolve: ({ input }) => registerBastionIdHandler(input)
  }))
  .mutation("create-staff", {
    input: staffSchema,
    resolve: ({ input }) => createStaffHandler(input)
  })
  .mutation("request-position", {
    input: positionSchema,
    resolve: ({ input }) => requestPositionHandler(input)
  })
