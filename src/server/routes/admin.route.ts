import { createRouter } from "src/server/createRouter";
import { createAdminHandler } from "../controller/admin.controller";
import { createAdminSchema } from "../schema/admin.schema";


export const adminRouter = createRouter()
  .mutation("signup", {
    input: createAdminSchema,
    resolve: ({ input }) => createAdminHandler(input)
  })


