import { PopulatedWriteup } from "@/src/server/controllers/writeup.controller"
import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { WriteupState } from "../slices/writeup.slice"


export const setWriteupReducer = ( state: WritableDraft<WriteupState>, action: PayloadAction<PopulatedWriteup> ) => {
  state = Object.assign(state, action.payload)
}