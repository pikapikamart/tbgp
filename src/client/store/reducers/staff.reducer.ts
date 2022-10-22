import { UpdateStaffSchema } from "@/src/server/schemas/staff.schema"
import { PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer/dist/internal"
import { AppThunk } from ".."
import { 
  FullStaffState,
  setStaff, 
  InitialStaffState, 
  isVerifiedStaffState} from "../slices/staff.slice"
import { FullStoryRequest, InitialStoryRequest } from "../slices/storyRequests.slice"

type State = WritableDraft<InitialStaffState>

export const setStaffReducer = ( state: State, action: PayloadAction<InitialStaffState> ) => {
  state = Object.assign(state, action.payload)
}

export const sendStaffVerificationReducer = ( state: State ) =>{
  state.verification = true
}

export const updateStaffReducer = ( state: State, action: PayloadAction<UpdateStaffSchema> ) =>{
  state = Object.assign(state, action.payload)
}

export const thunkSetStaffReducer = 
  ( staff: InitialStaffState ): AppThunk => 
  async dispatch => {
    dispatch(setStaff(staff))
} 

export const addCreatedStoryRequestReducer = ( state: State, action: PayloadAction<InitialStoryRequest> ) =>{
  if ( isVerifiedStaffState(state) ) {
    state.storyRequests.created.push(action.payload) 
  } 
}