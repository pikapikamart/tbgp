import { getWriteupHandler } from "../controllers/writeup.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { writeupIdWithPhaseSchema } from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: writeupIdWithPhaseSchema,
    resolve: ({ input }) => getWriteupHandler(input)
  })