import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { Article } from "@/src/server/models/article.model";
import { ModifyType } from "types/utils";
import { StaffProfile } from "../store.types";
import { setArticlesReducer } from "../reducers/articles.reducer";


export type InitialArticle = Omit<ModifyType<Article, {
  authors: StaffProfile[]
}> & {
  createdAt: string,
}, "content" | "writeup" | "banner">


export type ArticlesState = {
  topArticles: InitialArticle[],
  latestArticles: InitialArticle[]
}

const initialState: ArticlesState = {
  topArticles: [],
  latestArticles: []
}

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: setArticlesReducer
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
  setArticles
} = articleSlice.actions

export const selectArticles =  ( state: RootState ) => state.articles


export default articleSlice.reducer