import mongoose from "mongoose"


export type ArticleCategory = {
  categories: string[]
}

const articleCategorySchema = new mongoose.Schema({
  categories: [ String ]
})

const ArticleCategoryModel: mongoose.Model<ArticleCategory> = mongoose.models.ArticleCategory || mongoose.model("ArticleCategory", articleCategorySchema)

export { ArticleCategoryModel }