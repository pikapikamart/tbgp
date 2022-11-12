import { searchArticleHandler } from "../controllers/article.controller";
import { createRouter } from "../router/createRouter";
import { searchSchema } from "../schemas/article.schema";


export const articleRouter = createRouter()
  .query("search", {
    input: searchSchema,
    resolve: ({ input }) => searchArticleHandler(input)
  })