import mongoose from "mongoose";
import { 
  BaseArticlePaginateSchema, 
  SearchSchema,
  ViewArticleSchema,
  VisitAuthorSchema } from "../schemas/article.schema";
import { findArticleService, populateArticleService, updateArticleService } from "../services/article.service";
import { findStaffService } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { trpcSuccess } from "../utils/success.util";
import { staffValidator } from "./controller.utils";


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

// create a base pagination controller
export const visitAuthorHandler = async( info: VisitAuthorSchema ) =>{
  const author = staffValidator(await findStaffService(
    { username: info.username },
    "firstname lastname bio position"
  ))
  const ownedArticles = await populateArticleService(
    { authors: author._id },
    "category linkPath authors title caption thumbnail.small createdAt views",
    {
      sort: {
        createdAt: -1
      },
      limit: 10
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  return trpcSuccess(true, {
    author,
    ownedArticles
  })
}

export const viewArticleHandler = async( info: ViewArticleSchema ) => {
  const foundArticle = await findArticleService(
    { linkPath: info.linkPath },
    "_id viewsId",
    { lean: true }
  )
  console.log(info)

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