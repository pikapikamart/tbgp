import { FilterQuery } from "mongoose";
import { 
  ArticleCategory, 
  ArticleCategoryModel } from "../models/article.category.model";


export const findArticleCategoryService = async( query: FilterQuery<ArticleCategory> ) => (
  ArticleCategoryModel.findOne(query)
)

export const createArticleCategoryService = async( category: string ) => (
  ArticleCategoryModel.create({ categories: [category] })
)

export const addArticleCategoryService = async( category: string ) => (
  ArticleCategoryModel.findOneAndUpdate({}, {
    $push: {
      categories: category
    }
  })
)