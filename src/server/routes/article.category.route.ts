import { getAllCategoriesHandler } from "../controllers/article.category.controller";
import { createRouter } from "../router/createRouter";


export const articleCategoryRouter = createRouter()
  .query("get-all", {
    resolve: () => getAllCategoriesHandler()
  })
  .query("test", {
    resolve: () =>{ }
  })