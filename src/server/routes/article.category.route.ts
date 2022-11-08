import { getAllCategoriesHandler } from "../controllers/article.category.controller";
import { createRouter } from "../router/createRouter";


export const ArticleCategoryRouter = createRouter()
  .query("get-all", {
    resolve: () => getAllCategoriesHandler()
  })