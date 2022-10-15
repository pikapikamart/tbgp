import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Staff } from "@/src/server/models/staff.model";
import { setStaffReducer } from "../reducers/staff.reducer";
import { RootState } from "..";


export type StaffState = Omit<Staff, "password" | "bastionId">

const initialState = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  requests: {
    verification: false,
    story: []
  },
}


export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: setStaffReducer
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
  setStaff
} = staffSlice.actions
export const selectStaff = ( state: RootState ) => state.staff


export default staffSlice.reducer