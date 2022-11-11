import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { ArticlesState, CategorizedArticles, HomepageArticles } from "../slices/articles.slice"


export const setArticlesReducer = ( state: WritableDraft<ArticlesState>, action: PayloadAction<HomepageArticles> ) => {
  state.latestArticles = action.payload.latestArticles
  state.topArticles = action.payload.topArticles
}

export const setCategoryArticlesReducer = ( state: WritableDraft<ArticlesState>, action: PayloadAction<CategorizedArticles> ) => {
  state.categorizedArticles = action.payload
}