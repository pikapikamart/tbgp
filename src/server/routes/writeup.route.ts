import { 
  editWriteupHandler, 
  exitWriteupHandler, 
  getWriteupHandler, 
  saveWriteupHandler} from "../controllers/writeup.controller";
import { isValidStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  saveWriteupSchema,
  writeupIdSchema } from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: writeupIdSchema,
    resolve: ({ input }) => getWriteupHandler(input)
  })
  
  .mutation("edit", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => editWriteupHandler(input, ctx)
  })
  .mutation("save", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupHandler(input, ctx)
  })
  .mutation("exit", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => exitWriteupHandler(input, ctx)
  })