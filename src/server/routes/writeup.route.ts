import { 
  cancelWriteupSubmissionHandler,
  getMultipleWriteupHandler,
  getWriteupHandler,
  requestReSubmitHandler,
  saveWriteupHandler,
  saveWriteupPhaseHandler,
  submitWriteupHandler,
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
  reSubmitWriteupSchema,
  singleWriteupSchema,
} from "../schemas/writeup.schema";


export const writeupRouter = createRouter()
  // authentication
  .middleware(({ ctx, next }) => isValidStaff(ctx, next))
  .query("get-multiple", {
    input: activitiesTabSchema,
    resolve: ({ input }) => getMultipleWriteupHandler(input)
  })
  .query("get", {
    input: singleWriteupSchema,
    resolve: ({ input, ctx }) => getWriteupHandler(input, ctx)
  })
  // authentication
  .middleware(({ ctx, next }) => isVerifiedStaff(ctx, next))
  .mutation("save-writeupPhase", {
    input: saveWriteupPhaseSchema,
    resolve: ({ input, ctx }) => saveWriteupPhaseHandler(input, ctx)
  })
  .mutation("submit-writeupPhase", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => submitWriteupPhaseHandler(input, ctx)
  })
  .mutation("cancel-writeupSubmission", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => cancelWriteupSubmissionHandler(input, ctx)
  })
  // authentication
  .middleware(({ ctx, next }) => isStaffEditor(ctx, next))
  .mutation("take-task", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => takeWriteupTaskHandler(input, ctx)
  })
  .mutation("save", {
    input: saveWriteupSchema,
    resolve: ({ input, ctx }) => saveWriteupHandler(input, ctx)
  })
  .mutation("submit", {
    input: writeupIdSchema,
    resolve: ({ input, ctx }) => submitWriteupHandler(input, ctx)
  })
  .mutation("re-submit", {
    input: reSubmitWriteupSchema,
    resolve: ({ input, ctx }) => requestReSubmitHandler(input, ctx)
  })