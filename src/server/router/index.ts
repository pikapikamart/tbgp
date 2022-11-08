import superjson from "superjson";
import { connectDatabase } from "../database";
import { adminRouter } from "../routes/admin.route";
import { ArticleCategoryRouter } from "../routes/article.category.route";
import { staffRouter } from "../routes/staff.route";
import { storyRequestRouter } from "../routes/story.request.route";
import { writeupRouter } from "../routes/writeup.route";
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
  .merge("storyRequest.", storyRequestRouter)
  .merge("writeup.", writeupRouter)
  .merge("categories.", ArticleCategoryRouter)


export type AppRouter = typeof appRouter;