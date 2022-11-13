import { InitialArticle } from "@/store/slices/articles.slice";
import { StaffProfile } from "@/store/store.types";
import mongoose from "mongoose";
import { 
  BaseArticlePaginateSchema, 
  MoreCategoryArticlesSchema, 
  PaginateAuthorArticleSchema, 
  SearchSchema,
  ViewArticleSchema,
  VisitAuthorSchema } from "../schemas/article.schema";
import { 
  findArticleService, 
  populateArticleService, 
  updateArticleService } from "../services/article.service";
import { findStaffService } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { trpcSuccess } from "../utils/success.util";
import { staffValidator } from "./controller.utils";


const basePopulatePath = {
  path: "authors",
  select: "-_id firstname lastname username"
}

export const searchArticleHandler = async( search: SearchSchema ) => {
  const query = Object.assign(
    {
      title: {
        $regex: new RegExp(search.query, "i")
      },
    },
    search.paginate?.lastId? {
      _id: {
        $lt: new mongoose.Types.ObjectId(search.paginate.lastId)
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
      limit: search.paginate?.number?? 8
    },
    basePopulatePath
  )

  return trpcSuccess(true, searchArticles as unknown as InitialArticle[])
}

export const latestArticlesHandler = async( input: BaseArticlePaginateSchema ) => {
  const query = Object.assign({}, input?.lastId? 
    {
      _id: {
        $lt: new mongoose.Types.ObjectId(input.lastId)
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
      limit: input?.lastId? input.number : 8
    },
    basePopulatePath
  )
 
  return trpcSuccess(true, latestArticles as unknown as InitialArticle[])
}

export const moreCategoryArticlesHandler = async( info: MoreCategoryArticlesSchema ) =>{
  const moreArticles = await populateArticleService(
    {
      category: info.category,
      _id: {
        $lt: new mongoose.Types.ObjectId(info.paginate?.lastId)
      }
    },
    "category linkPath authors title caption thumbnail.small createdAt views",
    {
      sort: {
        createdAt: -1
      },
      limit: info.paginate?.number?? 8
    },
    basePopulatePath
  )

  return trpcSuccess(true, moreArticles as unknown as InitialArticle[])
}

export type Author = Omit<StaffProfile, "bastionId"> & {
  _id: string,
  bio: string
}

export const visitAuthorHandler = async( info: VisitAuthorSchema ) =>{
  const author = staffValidator(await findStaffService(
    { username: info.username },
    "firstname lastname bio position"
  ))

  return trpcSuccess(true, author as unknown as Author)
}

export const paginateAuthorArticleHandler = async( user: PaginateAuthorArticleSchema ) =>{
  const query = Object.assign({}, user.paginate?.lastId? 
    {
      authors: user.id,
      _id: {
        $lt: new mongoose.Types.ObjectId(user.paginate.lastId)
      }
    } : undefined
  )
  
  const articles = await populateArticleService(
    query,
    "category linkPath authors title caption thumbnail.small createdAt views",
    {
      sort: {
        createdAt: -1
      },
      limit: 2
    },
    basePopulatePath
  )

  return trpcSuccess(true, articles as unknown as InitialArticle[])
}

export const viewArticleHandler = async( info: ViewArticleSchema ) => {
  const foundArticle = await findArticleService(
    { linkPath: info.linkPath },
    "_id viewsId",
    { lean: true }
  )

  if ( !foundArticle ) {
    return trpcError("NOT_FOUND", "No article found with this link")
  }

  if ( !foundArticle.viewsId.includes(info.fingerprint) ) {
    await updateArticleService(
      { linkPath: info.linkPath },
      {
        $inc: {
          views: 1
        },
        $push: {
          viewsId: info.fingerprint
        }
      }
    )
  }

  return trpcSuccess(true, "Viewed")
}