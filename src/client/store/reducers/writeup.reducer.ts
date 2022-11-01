import { HeaderFields } from "@/components/staff/writeup/write/header/header.hook"
import { PopulatedWriteup } from "@/src/server/controllers/writeup.controller"
import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { Descendant } from "slate"
import { WriteupState } from "../slices/writeup.slice"


type DraftWriteupState = WritableDraft<WriteupState>

export const setWriteupReducer = ( state: DraftWriteupState, action: PayloadAction<PopulatedWriteup> ) => {
  state = Object.assign(state, action.payload)
}

export const setShouldSaveReducer = ( state: DraftWriteupState ) => {
  state.shouldSave = true
}

export const setWriteupHeadingReducer = ( state: DraftWriteupState, action: PayloadAction<HeaderFields> ) =>{
  state.content[0].title = action.payload.title
  state.content[0].caption = action.payload.caption
  state.isHeadingValid = true
}

export const setWriteupSlateReducer = ( state: DraftWriteupState, action: PayloadAction<Descendant[]> ) =>{
  state.content[0].data = action.payload
  state.isSlateValid = true
}

export const resetSubmissionReducer = ( state: DraftWriteupState ) =>{
  state.isHeadingValid = false
  state.isSlateValid = false
  state.shouldSave = false
}