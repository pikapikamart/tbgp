import { 
  getMultipleWriteupHandler,
  getWriteupHandler, 
  saveWriteupHandler,
  saveWriteupPhaseHandler} from "../controllers/writeup.controller";
import { 
  isValidStaff, 
  isVerifiedStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  saveWriteupSchema,
  writeupIdSchema, 
  activitiesTabSchema, 
} from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get", {
    input: writeupIdSchema,
    resolve: ({ input }) => getWriteupHandler(input)
  })
  .query("get-multiple", {
    input: activitiesTabSchema,
    resolve: ({ input }) => getMultipleWriteupHandler(input)
  })
  .middleware(({ ctx, next }) => isVerifiedStaff(ctx, next))
  .mutation("save", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupHandler(input, ctx)
  })
  .mutation("save-writeupPhase", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupPhaseHandler(input, ctx)
  })
  