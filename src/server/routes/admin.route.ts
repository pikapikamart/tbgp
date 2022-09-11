import { createRouter } from "src/server/router/createRouter";
import { 
  createAdminHandler, 
  createBastionIdHandler, 
  verifyPositionHandler} from "../controllers/admin.controller";
import { isValidAdmin } from "../middlewares/router.middleware";
import { 
  adminSchema, 
  verifyPositionSchema} from "../schemas/admin.schema";


export const adminRouter = createRouter()
  .mutation("create-admin", {
    input: adminSchema,
    resolve: ({ input }) => createAdminHandler(input)
  })
  // authentication needed
  .middleware(async({ ctx, next }) => isValidAdmin(ctx, next))
  .mutation("create-bastionId", {
    resolve: ({ ctx }) => createBastionIdHandler(ctx)
  })
  .mutation("verify-position", {
    input: verifyPositionSchema,
    resolve: ({ input, ctx }) => verifyPositionHandler(input, ctx)
  })
