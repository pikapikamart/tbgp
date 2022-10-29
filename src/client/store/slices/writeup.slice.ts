import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { PopulatedWriteup } from "@/src/server/controllers/writeup.controller";
import { setWriteupReducer } from "../reducers/writeup.reducer";


export type WriteupState = PopulatedWriteup

const initialState: WriteupState = {
  request: {
    members: [],
    title: "",
    category: "",
    instruction: "",
    createdAt: new Date()
  },
  writeupId: "",
  banner: "",
  currentPhase: "",
  content: [{
    phase: "",
    title: "",
    caption: "",
    data: [],
    notes: [],
    isSubmitted: false,
    isAccepted: false,
    reSubmit: false,
    requestedResubmit: false
  }]
}

export const writeupSlice = createSlice({
  name:"writeup",
  initialState: initialState as WriteupState,
  reducers: {
    setWriteup: setWriteupReducer
  },
  extraReducers: {
    [HYDRATE]: ( state, action ) => {
      return {
        ...state,
        ...action.payload.writeup,
      }
    }
  }
})

export const {
  setWriteup
} = writeupSlice.actions;
export const selectWriteup = ( state: RootState ) => state.writeup;


export default writeupSlice.reducer;