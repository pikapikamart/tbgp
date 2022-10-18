import { UpdateStaffSchema } from "@/src/server/schemas/staff.schema"
import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { AppThunk } from ".."
import { 
  setStaff, 
  StaffState } from "../slices/staff.slice"

type State = WritableDraft<StaffState>

export const setStaffReducer = ( state: State, action: PayloadAction<StaffState> ) => {
  state = Object.assign(state, action.payload)
}

export const sendStaffVerificationReducer = ( state: State ) =>{
  state.verification = true
}

export const updateStaffReducer = ( state: State, action: PayloadAction<UpdateStaffSchema> ) =>{
  state = Object.assign(state, action.payload)
}

export const thunkSetStaffReducer = 
  ( staff: StaffState ): AppThunk => 
  async dispatch => {
    dispatch(setStaff(staff))
} 