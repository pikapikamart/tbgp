import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Admin } from "@/src/server/models/admin.model";
import { 
  addBastionIdReducer, 
  rejectStaffVerificationReducer, 
  setAdminReducer } from "../reducers/admin.reducers";
import { RootState } from "..";


export type AdminState = Pick<Admin,"bastionIds" | "verifications">

const initialState: AdminState = {
  bastionIds: [],
  verifications: []
}

export const adminSlice = createSlice({
  name:"admin",
  initialState,
  reducers: {
    setAdmin: setAdminReducer,
    addBastionId: addBastionIdReducer,
    rejectStaffVerification: rejectStaffVerificationReducer
  },
  extraReducers: {
    [HYDRATE]: ( state, action ) => {
      return {
        ...state,
        ...action.payload,
      }
    }
  }
})

export const { 
  setAdmin,
  addBastionId,
  rejectStaffVerification } = adminSlice.actions;
export const selectAdminBastionIds = ( state: RootState ) => state.admin.bastionIds;
export const selectAdminVerifications = ( state: RootState ) => state.admin.verifications;


export default adminSlice.reducer;