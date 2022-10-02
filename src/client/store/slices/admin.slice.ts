import { createSlice } from "@reduxjs/toolkit";
import { Admin } from "@/src/server/models/admin.model";
import { 
  addBastionIdReducer, 
  setAdminReducer } from "../reducers/admin.reducers";


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
    addBastionId: addBastionIdReducer
  }
})

export const { 
  setAdmin,
  addBastionId } = adminSlice.actions;
export const selectAdminBastionIds = ( state: AdminState ) => state.bastionIds;
export const selectAdminVerifications = ( state: AdminState ) => state.verifications;


export default adminSlice.reducer;