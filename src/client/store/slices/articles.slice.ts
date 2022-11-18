import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { Article } from "@/src/server/models/article.model";
import { ModifyType } from "types/utils";
import { StaffProfile } from "../store.types";
import { 
  resetViewingArticleReducer,
  setArticlesReducer, 
  setCategoryArticlesReducer,
  setViewingArticleReducer} from "../reducers/articles.reducer";
import { Descendant } from "slate";


export type InitialArticle = Omit<ModifyType<Article, {
  authors: StaffProfile[]
}> & {
  createdAt: string,
  _id: any,
}, "content" | "writeup" | "banner">

export type FullArticle = InitialArticle & {
  banner: {
    url: string,
    caption: string
  },
  content: Descendant[]
}

export type HomepageArticles = {
  topArticles: InitialArticle[],
  latestArticles: InitialArticle[]
}

export type CategorizedArticles = {
  category: string,
  topArticles: InitialArticle[],
  moreArticles: InitialArticle[]
}

export type ArticlesState = {
  topArticles: InitialArticle[],
  latestArticles: InitialArticle[],
  categorizedArticles: CategorizedArticles,
  viewing?: FullArticle
}

const initialState: ArticlesState = {
  topArticles: [],
  latestArticles: [],
  categorizedArticles: {
    category: "",
    topArticles: [],
    moreArticles: []
  }
}

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: setArticlesReducer,
    setCategorizedArticles: setCategoryArticlesReducer,
    setViewingArticle: setViewingArticleReducer,
    resetViewingArticle: resetViewingArticleReducer,
  },
  extraReducers: {
    [HYDRATE]: ( state, action ) => {
      return {
        ...state,
        ...action.payload.articles,
      }
    }
  }
})

export const {
  setArticles,
  setCategorizedArticles,
  setViewingArticle,
  resetViewingArticle,
} = articleSlice.actions

export const selectArticles =  ( state: RootState ) => state.articles


export default articleSlice.reducer