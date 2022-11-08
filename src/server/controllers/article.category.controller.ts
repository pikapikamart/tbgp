import { findArticleCategoryService } from "../services/article.category.service"
import { trpcSuccess } from "../utils/success.util"


export const getAllCategoriesHandler = async() =>{ 
  const foundCategories = await findArticleCategoryService({})

  if ( !foundCategories ) {
    return trpcSuccess(true, [])
  }

  return trpcSuccess(true, foundCategories.categories)
}