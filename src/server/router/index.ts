import { createRouter } from "src/server/createRouter";
import superjson from "superjson";
import { connectDatabase } from "../database";
import { adminRouter } from "../routes/admin.route";
    

export const appRouter = 
  createRouter()
  .transformer(superjson)
  .middleware(async ({ next }) =>{
    await connectDatabase();

    return next();
})
  .merge("admin.", adminRouter)


export type AppRouter = typeof appRouter;


