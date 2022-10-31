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
  state.isHeadingError = false
  state.isHeadingValid = true
  state.content[0].title = action.payload.title
  state.content[0].caption = action.payload.caption
}

export const setInvalidHeadingReducer = ( state: DraftWriteupState ) =>{
  state.isHeadingError = true
}

export const setInvalidSlateReducer = ( state: DraftWriteupState ) =>{
  state.isSlateError = true
}

export const setWriteupSlateReducer = ( state: DraftWriteupState, action: PayloadAction<Descendant[]> ) =>{
  state.isSlateError = false
  state.isSlateValid = true
  state.content[0].data = action.payload
}

export const resetSubmissionReducer = ( state: DraftWriteupState ) =>{
  state.isHeadingError = false
  state.isHeadingValid = false
  state.isSlateError = false
  state.isSlateValid = false
  state.shouldSave = false
}