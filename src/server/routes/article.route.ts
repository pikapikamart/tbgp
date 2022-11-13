import { 
  latestArticlesHandler, 
  searchArticleHandler, 
  viewArticleHandler, 
  visitAuthorHandler} from "../controllers/article.controller";
import { createRouter } from "../router/createRouter";
import { 
  viewArticleSchema,
  baseArticlePaginateSchema, 
  searchSchema, 
  visitAuthorSchema} from "../schemas/article.schema";


export const articleRouter = createRouter()
  .query("search", {
    input: searchSchema,
    resolve: ({ input }) => searchArticleHandler(input)
  })
  .query("latest", {
    input: baseArticlePaginateSchema,
    resolve: ({ input }) => latestArticlesHandler(input)
  })
  .query("author", {
    input: visitAuthorSchema,
    resolve: ({ input }) => visitAuthorHandler(input)
  })
  .mutation("view", {
    input: viewArticleSchema,
    resolve: ({ input }) => viewArticleHandler(input)
  })