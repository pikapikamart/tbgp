import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { ArticlesState } from "../slices/articles.slice"


export const setArticlesReducer = ( state: WritableDraft<ArticlesState>, action: PayloadAction<ArticlesState> ) => {
  state.latestArticles = action.payload.latestArticles
  state.topArticles = action.payload.topArticles
}