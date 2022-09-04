import { createRouter } from "src/server/router/createRouter";
import { 
  createAdminHandler, 
  createBastionIdHandler, 
  verifyPositionHandler} from "../controller/admin.controller";
import { 
  createAdminSchema, 
  verifyPositionSchema } from "../schema/admin.schema";


export const adminRouter = createRouter()
  .mutation("signup", {
    input: createAdminSchema,
    resolve: ({ input }) => createAdminHandler(input)
  })
  .mutation("create-id", {
    resolve: () => createBastionIdHandler()
  })
  .mutation("verify-position", {
    input: verifyPositionSchema,
    resolve: ({ input }) => verifyPositionHandler(input)
  })
