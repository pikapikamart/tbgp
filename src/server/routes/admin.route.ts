import { createRouter } from "src/server/router/createRouter";
import { 
  createAdminHandler, 
  createBastionIdHandler, 
  verifyPositionHandler} from "../controller/admin.controller";
import { 
  adminSchema, 
  positionSchema } from "../schema/admin.schema";


export const adminRouter = createRouter()
  .mutation("create-admin", {
    input: adminSchema,
    resolve: ({ input }) => createAdminHandler(input)
  })
  .mutation("create-bastionId", {
    resolve: () => createBastionIdHandler()
  })
  .mutation("verify-position", {
    input: positionSchema,
    resolve: ({ input }) => verifyPositionHandler(input)
  })
