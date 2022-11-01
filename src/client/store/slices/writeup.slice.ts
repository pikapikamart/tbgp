import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { PopulatedWriteup } from "@/src/server/controllers/writeup.controller";
import { 
  resetSubmissionReducer,
  setShouldSaveReducer,
  setWriteupHeadingReducer,
  setWriteupReducer, 
  setWriteupSlateReducer} from "../reducers/writeup.reducer";
import { WriteupPhases } from "@/src/server/models/writeup.model";
import { ModifyType } from "types/utils";


export type WriteupState = ModifyType<PopulatedWriteup, {
  currentPhase: "" | WriteupPhases
}> & {
  shouldSave: boolean,
  isHeadingValid: boolean,
  isSlateValid: boolean,
}

// bad redux
const initialState: WriteupState = {
  request: {
    members: [],
    title: "",
    category: "",
    instruction: "",
    createdAt: ""
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
  }],
  shouldSave: false,
  isHeadingValid: false,
  isSlateValid: false,
}

export const writeupSlice = createSlice({
  name:"writeup",
  initialState: initialState as WriteupState,
  reducers: {
    setWriteup: setWriteupReducer,
    setShouldSave: setShouldSaveReducer,
    setWriteupHeading: setWriteupHeadingReducer,
    setWriteupSlate: setWriteupSlateReducer,
    resetSubmission: resetSubmissionReducer
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
  setWriteup,
  setShouldSave,
  setWriteupHeading,
  setWriteupSlate,
  resetSubmission
} = writeupSlice.actions;
export const selectWriteup = ( state: RootState ) => state.writeup;


export default writeupSlice.reducer;