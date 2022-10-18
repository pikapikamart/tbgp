import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Staff } from "@/src/server/models/staff.model";
import { 
  sendStaffVerificationReducer, 
  setStaffReducer, 
  updateStaffReducer} from "../reducers/staff.reducer";
import { RootState } from "..";


export type StaffState = Omit<Staff, "password" | "bastionId">

const initialState: StaffState = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  bio: "",
  verification: false,
  position: null,
  storyRequests: {
    requested: [],
    joined: [],
    created: []
  }
}

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: setStaffReducer,
    sendStaffVerification: sendStaffVerificationReducer,
    updateStaff: updateStaffReducer
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


export default staffSlice.reducer