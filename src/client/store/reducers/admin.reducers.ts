import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { AdminState } from "../slices/admin.slice"


export const setAdminReducer = ( state: WritableDraft<AdminState>, action: PayloadAction<AdminState> ) => {
  state.bastionIds = action.payload.bastionIds
  state.verifications = action.payload.verifications
}

export const addBastionIdReducer = ( state: WritableDraft<AdminState>, action: PayloadAction<string> ) => {
  state.bastionIds.push(action.payload)
}