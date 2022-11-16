import "../models"
import { 
  DocumentDefinition, 
  FilterQuery, 
  PopulateOptions, 
  ProjectionType,
  QueryOptions,
  UpdateQuery} from "mongoose";
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

export const findAllArticleLinksService = async() => (
  ArticleModel.find(
    {},
    "-_id linkPath",
    { lean: true }
  )
)

export const populateArticleService = async(
  query: FilterQuery<Article>,
  projection: ProjectionType<Article> = "",
  options: QueryOptions = {},
  populate: PopulateOptions
) => (
  ArticleModel.find(query, projection, options).populate(populate)
)

export const updateArticleService = async(
  query: FilterQuery<Article>,
  update: UpdateQuery<Article>
) => (
  ArticleModel.findOneAndUpdate(query, update)
)