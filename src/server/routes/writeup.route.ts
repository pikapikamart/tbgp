import { 
  editWriteupHandler, 
  getWriteupHandler, 
  saveWriteupHandler} from "../controllers/writeup.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  saveWriteupSchema,
  writeupIdWithPhaseSchema } from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: writeupIdWithPhaseSchema,
    resolve: ({ input }) => getWriteupHandler(input)
  })
  .mutation("edit", {
    input: writeupIdWithPhaseSchema,
    resolve: ({ input, ctx }) => editWriteupHandler(input, ctx)
  })
  .mutation("save", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupHandler(input, ctx)
  })