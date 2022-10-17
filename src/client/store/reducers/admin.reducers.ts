import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { AppThunk } from ".."
import { AdminState, setAdmin } from "../slices/admin.slice"


export const setAdminReducer = ( state: WritableDraft<AdminState>, action: PayloadAction<AdminState> ) => {
  state.bastionIds = action.payload.bastionIds
  state.verifications = action.payload.verifications
}

export const addBastionIdReducer = ( state: WritableDraft<AdminState>, action: PayloadAction<string> ) => {
  state.bastionIds.push(action.payload)
}

export const rejectStaffVerificationReducer = ( state: WritableDraft<AdminState>, action: PayloadAction<string> ) => {
  state.verifications = state.verifications.filter(verification => verification.bastionId!==action.payload)
}

export const thunkSetAdminReducer = ( admin: AdminState ): AppThunk => async dispatch =>{
  dispatch(setAdmin(admin))
}