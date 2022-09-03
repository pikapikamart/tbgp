import { registerIdHandler } from "../controller/staff.controller";
import { createRouter } from "../router/createRouter";
import { registerIdSchema } from "../schema/staff.schema";


export const staffRouter = createRouter()
  .query("register-id", ({
    input: registerIdSchema,
    resolve: ({ input }) => registerIdHandler(input)
  }))