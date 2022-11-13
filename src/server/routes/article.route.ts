import { 
  latestArticlesHandler, 
  moreCategoryArticlesHandler, 
  paginateAuthorArticleHandler, 
  searchArticleHandler, 
  viewArticleHandler, 
  visitAuthorHandler} from "../controllers/article.controller";
import { createRouter } from "../router/createRouter";
import { 
  viewArticleSchema,
  baseArticlePaginateSchema, 
  searchSchema, 
  visitAuthorSchema,
  moreCategoryArticlesSchema,
  paginateAuthorSchema} from "../schemas/article.schema";


export const articleRouter = createRouter()
  .query("search", {
    input: searchSchema,
    resolve: ({ input }) => searchArticleHandler(input)
  })
  .query("latest", {
    input: baseArticlePaginateSchema,
    resolve: ({ input }) => latestArticlesHandler(input)
  })
  .query("category", {
    input: moreCategoryArticlesSchema,
    resolve: ({ input }) => moreCategoryArticlesHandler(input)
  })
  .query("author", {
    input: visitAuthorSchema,
    resolve: ({ input }) => visitAuthorHandler(input)
  })
  .query("paginate-author", {
    input: paginateAuthorSchema,
    resolve: ({ input }) => paginateAuthorArticleHandler(input)
  })
  .mutation("view", {
    input: viewArticleSchema,
    resolve: ({ input }) => viewArticleHandler(input)
  })