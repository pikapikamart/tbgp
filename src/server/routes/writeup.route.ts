import { 
  getMultipleWriteupHandler,
  getWriteupHandler, 
  saveWriteupHandler} from "../controllers/writeup.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  saveWriteupSchema,
  writeupIdSchema, 
  writeupPhaseSchema} from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: writeupIdSchema,
    resolve: ({ input }) => getWriteupHandler(input)
  })
  .query("get-multiple", {
    input: writeupPhaseSchema,
    resolve: ({ input }) => getMultipleWriteupHandler(input)
  })
  .mutation("save", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupHandler(input, ctx)
  })