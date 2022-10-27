import { 
  getMultipleWriteupHandler,
  saveWriteupHandler,
  saveWriteupPhaseHandler,
  submitWriteupPhaseHandler,
  takeWriteupTaskHandler} from "../controllers/writeup.controller";
import { 
  isStaffEditor,
  isValidStaff, 
  isVerifiedStaff } from "../middlewares/router.middleware";
import { createRouter } from "../router/createRouter";
import { 
  saveWriteupSchema,
  writeupIdSchema, 
  activitiesTabSchema,
  saveWriteupPhaseSchema,
} from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get-multiple", {
    input: activitiesTabSchema,
    resolve: ({ input }) => getMultipleWriteupHandler(input)
  })
  .middleware(({ ctx, next }) => isVerifiedStaff(ctx, next))
  .mutation("save-writeupPhase", {
    input: saveWriteupPhaseSchema,
    resolve: ({ input, ctx }) => saveWriteupPhaseHandler(input, ctx)
  })
  .mutation("submit-writeupPhase", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => submitWriteupPhaseHandler(input, ctx)
  })
  .middleware(({ ctx, next }) => isStaffEditor(ctx, next))
  .mutation("take-task", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => takeWriteupTaskHandler(input, ctx)
  })
  .mutation("save", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupHandler(input, ctx)
  })