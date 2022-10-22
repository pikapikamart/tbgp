import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { 
  Staff, 
  VerifiedStaff } from "@/src/server/models/staff.model";
import { 
  addCreatedStoryRequestReducer,
  sendStaffVerificationReducer, 
  setStaffReducer, 
  updateStaffReducer} from "../reducers/staff.reducer";
import { RootState } from "..";
import { ModifyType } from "types/utils";
import { InitialStoryRequest } from "./storyRequests.slice";
import { WritableDraft } from "immer/dist/internal";


export type InitialStaffState = Omit<Staff, "password">
export type FullStaffState = ModifyType<InitialStaffState, {
  storyRequests: {
    requested: InitialStoryRequest[],
    joined: InitialStoryRequest[],
    created: InitialStoryRequest[]
  }
}>

const initialState: InitialStaffState = {
  email: "",
  bastionId: "",
  username: "",
  firstname: "",
  lastname: "",
  bio: "",
  verification: false,
  position: null,
  storyRequests: null,
  writeups: null
}

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: setStaffReducer,
    sendStaffVerification: sendStaffVerificationReducer,
    updateStaff: updateStaffReducer,
    addCreatedStoryRequest: addCreatedStoryRequestReducer,
  },
  extraReducers: {
    [HYDRATE]: ( state, action ) => {
      return {
        ...state,
        ...action.payload.staff,
      }
    }
  }
})

export const {
  setStaff,
  sendStaffVerification,
  updateStaff
} = staffSlice.actions
export const selectStaff = ( state: RootState ) => state.staff

export const isVerifiedStaffState = ( state: WritableDraft<InitialStaffState> | WritableDraft<FullStaffState> ): state is WritableDraft<FullStaffState> => {
  return ( state as WritableDraft<FullStaffState> ).position!==null
}

export default staffSlice.reducer