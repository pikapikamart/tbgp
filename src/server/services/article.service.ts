import { DocumentDefinition } from "mongoose";
import { 
  Article, 
  ArticleModel } from "../models/article.model";


export const createArticleService = async( article: DocumentDefinition<Article> ) => (
  ArticleModel.create(article)
)