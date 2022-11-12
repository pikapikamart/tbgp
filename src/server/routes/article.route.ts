import { 
  latestArticlesHandler, 
  searchArticleHandler } from "../controllers/article.controller";
import { createRouter } from "../router/createRouter";
import { 
  baseArticlePaginateSchema, 
  searchSchema } from "../schemas/article.schema";


export const articleRouter = createRouter()
  .query("search", {
    input: searchSchema,
    resolve: ({ input }) => searchArticleHandler(input)
  })
  .query("latest", {
    input: baseArticlePaginateSchema,
    resolve: ({ input }) => latestArticlesHandler(input)
  })