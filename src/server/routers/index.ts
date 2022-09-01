import { createRouter } from "@/api-lib/createRouter";
import superjson from "superjson";
import { connectDatabase } from "@/api-lib/database";
    

export const appRouter = 
  createRouter()
  .transformer(superjson)
  .middleware(async ({ next }) =>{
    await connectDatabase();

    return next();
})


export type AppRouter = typeof appRouter;


