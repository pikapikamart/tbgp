import { createRouter } from "src/server/router/createRouter";
import { 
  createAdminHandler, 
  createBastionIdHandler, 
  getProfileHandler, 
  validateAdminHandler, 
  verifyPositionHandler} from "../controllers/admin.controller";
import { isValidAdmin } from "../middlewares/router.middleware";
import { 
  adminSchema, 
  verifyPositionSchema} from "../schemas/admin.schema";
import { baseUserSchema } from "../schemas/base.user.schema";


export const adminRouter = createRouter()
  .query("validate", {
    input: baseUserSchema,
    resolve: ({ input }) => validateAdminHandler(input)
  })
  .mutation("create-admin", {
    input: adminSchema,
    resolve: ({ input }) => createAdminHandler(input)
  })
  // authentication
  .middleware(async({ ctx, next }) => isValidAdmin(ctx, next))
  .query("get-profile", {
    resolve: ({ ctx }) => getProfileHandler(ctx)
  })
  .mutation("create-bastionId", {
    resolve: ({ ctx }) => createBastionIdHandler(ctx)
  })
  .mutation("verify-position", {
    input: verifyPositionSchema,
    resolve: ({ input, ctx }) => verifyPositionHandler(input, ctx)
  })
