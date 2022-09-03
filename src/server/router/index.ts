import superjson from "superjson";
import { connectDatabase } from "../database";
import { adminRouter } from "../routes/admin.route";
import { staffRouter } from "../routes/staff.route";
import { createRouter } from "./createRouter";


export const appRouter = 
  createRouter()
  .transformer(superjson)
  .middleware(async ({ next }) =>{
    await connectDatabase();
    
    return next();
})
  .merge("admin.", adminRouter)
  .merge("staff.", staffRouter)


export type AppRouter = typeof appRouter;


