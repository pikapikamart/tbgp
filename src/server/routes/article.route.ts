import { 
  latestArticlesHandler, 
  searchArticleHandler, 
  visitAuthorHandler} from "../controllers/article.controller";
import { createRouter } from "../router/createRouter";
import { 
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