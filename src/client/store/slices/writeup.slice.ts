import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { PopulatedWriteup } from "@/src/server/controllers/writeup.controller";
import { 
  setInvalidHeadingReducer,
  setInvalidSlateReducer,
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
  isHeadingError: boolean,
  isSlateError: boolean
}

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
  isHeadingError: false,
  isSlateError: false
}

export const writeupSlice = createSlice({
  name:"writeup",
  initialState: initialState as WriteupState,
  reducers: {
    setWriteup: setWriteupReducer,
    setShouldSave: setShouldSaveReducer,
    setWriteupHeading: setWriteupHeadingReducer,
    setInvalidHeading: setInvalidHeadingReducer,
    setInvalidSlate: setInvalidSlateReducer,
    setWriteupSlate: setWriteupSlateReducer
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
  setInvalidHeading,
  setInvalidSlate,
  setWriteupSlate
} = writeupSlice.actions;
export const selectWriteup = ( state: RootState ) => state.writeup;


export default writeupSlice.reducer;