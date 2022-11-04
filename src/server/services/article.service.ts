import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType,
  QueryOptions} from "mongoose";
import { 
  Article, 
  ArticleModel } from "../models/article.model";


export const createArticleService = async( article: DocumentDefinition<Article> ) => (
  ArticleModel.create(article)
)

export const findArticleService = async(
  query: FilterQuery<Article>,
  projection: ProjectionType<Article> = "",
  options: QueryOptions = {}
) => (
  ArticleModel.findOne(query, projection, options)
)