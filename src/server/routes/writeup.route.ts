import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { writeupIdSchema } from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: writeupIdSchema,
    resolve: ({ input }) => {}
  })