import { createRouter } from "src/server/router/createRouter";
import { 
  createAdminHandler, 
  createBastionIdHandler, 
  editStaffPositionHandler, 
  getProfileHandler, 
  getStaffsProfileHandler, 
  validateAdminHandler, 
  verifyPositionHandler} from "../controllers/admin.controller";
import { isValidAdmin } from "../middlewares/router.middleware";
import { 
  adminSchema, 
  editStaffPositionSchema, 
  verifyStaffSchema} from "../schemas/admin.schema";
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
  .query("get-staffs-profile", {
    resolve: () => getStaffsProfileHandler()
  })
  .mutation("create-bastionId", {
    resolve: ({ ctx }) => createBastionIdHandler(ctx)
  })
  .mutation("verify-position", {
    input: verifyStaffSchema,
    resolve: ({ input, ctx }) => verifyPositionHandler(input, ctx)
  })
  .mutation("edit-staff-position", {
    input: editStaffPositionSchema,
    resolve: ({ input }) => editStaffPositionHandler(input)
  })