import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { 
  Position, 
  Staff } from "@/src/server/models/staff.model";
import { 
  addCreatedStoryRequestReducer,
  addStoryRequestApplicationReducer,
  addWriteupTaskReducer,
  resubmitTaskReducer,
  sendStaffVerificationReducer, 
  setStaffReducer, 
  updateStaffReducer,
  updateTaskReducer,
  updateWriteupReducer} from "../reducers/staff.reducer";
import { RootState } from "..";
import { ModifyType } from "types/utils";
import { 
  InitialStoryRequest, 
  InitialWriteup,
  PopulatedInitialWriteup, 
  StaffProfile} from "../store.types";
import { WritableDraft } from "immer/dist/internal";


export type InitialStaffState = Omit<Staff, "password">

export type FullStaffState = ModifyType<InitialStaffState, {
  position: Position,
  storyRequests: {
    requested: string[],
    joined: string[],
    created: InitialStoryRequest[]
  },
  writeups: {
    solo: PopulatedInitialWriteup[],
    collaborated: PopulatedInitialWriteup[]
  }
}>

export type CreatedStoryRequest = ModifyType<InitialStoryRequest, {
  members: string[]
}> & {
  requests: Pick<StaffProfile, "username">[]
}

export type EditorStaffState = ModifyType<FullStaffState, {
  storyRequests: {
    requested: string[],
    joined: string[],
    created: CreatedStoryRequest[]
  },
  writeups: {
    solo: PopulatedInitialWriteup[],
    collaborated: PopulatedInitialWriteup[],
    task: PopulatedInitialWriteup[]
  }
}>

export type StaffState = InitialStaffState | FullStaffState | EditorStaffState

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
  initialState: initialState as InitialStaffState | FullStaffState | EditorStaffState,
  reducers: {
    setStaff: setStaffReducer,
    sendStaffVerification: sendStaffVerificationReducer,
    updateStaff: updateStaffReducer,
    addCreatedStoryRequest: addCreatedStoryRequestReducer,
    addStoryRequestApplication: addStoryRequestApplicationReducer,
    updateWriteup: updateWriteupReducer,
    addWriteupTask: addWriteupTaskReducer,
    updateTask: updateTaskReducer,
    resubmitTask: resubmitTaskReducer
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
  updateStaff,
  addCreatedStoryRequest,
  addStoryRequestApplication,
  updateWriteup,
  addWriteupTask,
  updateTask,
  resubmitTask
} = staffSlice.actions
export const selectStaff = ( state: RootState ) => state.staff

export type WritableStaffState = WritableDraft<InitialStaffState> | WritableDraft<FullStaffState> | WritableDraft<EditorStaffState>

export const isFullStaffState = ( state: StaffState ): state is FullStaffState => {
  return ( state as FullStaffState ).storyRequests!==null
}

export const isEditorStaffState = ( state: StaffState ): state is EditorStaffState => {
  const role = ( state as EditorStaffState ).position?.role

  return role==="sectionEditor" || role==="seniorEditor"
}

export const isCreatedStoryRequest = ( storyRequest: InitialStoryRequest | CreatedStoryRequest ): storyRequest is CreatedStoryRequest => {
  return ( storyRequest as CreatedStoryRequest ).requests!==undefined
}

export const isPopulatedInitialWriteup = ( writeup: InitialWriteup | PopulatedInitialWriteup ): writeup is PopulatedInitialWriteup => {
  return ( writeup as PopulatedInitialWriteup ).content.isSubmitted!==undefined
}


export default staffSlice.reducer