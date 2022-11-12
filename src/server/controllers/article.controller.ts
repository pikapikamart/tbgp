import mongoose from "mongoose";
import { BaseArticlePaginateSchema, SearchSchema } from "../schemas/article.schema";
import { populateArticleService } from "../services/article.service";
import { trpcSuccess } from "../utils/success.util";


export const searchArticleHandler = async( search: SearchSchema ) => {
  const query = Object.assign(
    {
      title: {
        $regex: new RegExp(search.query, "i")
      },
    },
    search.paginate?.lastId? {
      _id: {
        $gt: new mongoose.Types.ObjectId(search.paginate.lastId)
      }
    } : undefined
  )
  
  const searchArticles = await populateArticleService(
    query
    ,
    "category linkPath authors title caption thumbnail.small createdAt views",
    {
      sort: {
        createdAt: -1
      },
      limit: search.paginate?.number?? 10
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  return trpcSuccess(true, searchArticles)
}

export const latestArticlesHandler = async( input: BaseArticlePaginateSchema ) => {
  const query = Object.assign({}, input? 
    {
      _id: {
        $gt: new mongoose.Types.ObjectId(input.lastId)
      }
    } : undefined
  )
  const latestArticles = await populateArticleService(
    query,
    "category linkPath authors title caption thumbnail.small createdAt views",
    {
      sort: {
        createdAt: -1
      },
      limit: input?.number?? 10
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  return trpcSuccess(true, latestArticles)
}