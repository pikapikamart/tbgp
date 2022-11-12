import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { 
  ArticlesState, 
  CategorizedArticles, 
  FullArticle, 
  HomepageArticles } from "../slices/articles.slice"


export const setArticlesReducer = ( state: WritableDraft<ArticlesState>, action: PayloadAction<HomepageArticles> ) => {
  state.latestArticles = action.payload.latestArticles
  state.topArticles = action.payload.topArticles
}

export const setCategoryArticlesReducer = ( state: WritableDraft<ArticlesState>, action: PayloadAction<CategorizedArticles> ) => {
  state.categorizedArticles = action.payload
}

export const setViewingArticleReducer = ( state: WritableDraft<ArticlesState>, action: PayloadAction<FullArticle> ) => {
  state.viewing = action.payload
}

export const resetViewingArticleReducer = ( state: WritableDraft<ArticlesState> ) => {
  const { viewing, ...rest } = state
  state = Object.assign(rest)

  return state
}