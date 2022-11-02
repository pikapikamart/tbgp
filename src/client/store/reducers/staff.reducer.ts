import { UpdateStaffSchema } from "@/src/server/schemas/staff.schema"
import { PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from ".."
import { 
  setStaff, 
  InitialStaffState, 
  isFullStaffState, 
  StaffState,
  isEditorStaffState,
  WritableStaffState} from "../slices/staff.slice"
import { WriteupState } from "../slices/writeup.slice"
import { 
  InitialStoryRequest, 
  StaffProfile } from "../store.types"


export const setStaffReducer = ( state: WritableStaffState, action: PayloadAction<StaffState> ) => {
  
  if ( isFullStaffState(action.payload) ) {
    action.payload.storyRequests.created = action.payload.storyRequests.created.filter(request => !request.started)
  }

  state = Object.assign(state, action.payload)
}

export const sendStaffVerificationReducer = ( state: WritableStaffState ) =>{
  state.verification = true
}

export const updateStaffReducer = ( state: WritableStaffState, action: PayloadAction<UpdateStaffSchema> ) =>{
  state = Object.assign(state, action.payload)
}

export const addStoryRequestApplicationReducer = ( state: WritableStaffState, action: PayloadAction<string> ) => {
  if ( isFullStaffState(state) ) {
    state.storyRequests.requested.push(action.payload)
  }
}

export const addCreatedStoryRequestReducer = ( state: WritableStaffState, action: PayloadAction<InitialStoryRequest> ) =>{
  if ( isFullStaffState(state) ) {
    state.storyRequests.created.push(action.payload) 
  } 
}

type UpdateWriteupPayload = {
  writeupId: string,
  members: StaffProfile[]
}

export const updateWriteupReducer = ( state: WritableStaffState, action: PayloadAction<UpdateWriteupPayload> ) => {
  if ( isFullStaffState(state) ) {
    if ( action.payload.members.length>1 ) {
      const index = state.writeups.collaborated.findIndex(writeup => writeup.writeupId===action.payload.writeupId)
      state.writeups.collaborated[index].content.isSubmitted = true
    } else {
      const index = state.writeups.solo.findIndex(writeup => writeup.writeupId===action.payload.writeupId)
      state.writeups.solo[index].content.isSubmitted = true
    }
  }
}

export const updateTaskReducer = ( state: WritableStaffState, action: PayloadAction<string> ) => {
  if ( isEditorStaffState(state) ) {
    const index = state.writeups.task.findIndex(writeup => writeup.writeupId===action.payload)
    state.writeups.task[index].content.isSubmitted = true
  }
}

export const addWriteupTaskReducer = ( state: WritableStaffState, action: PayloadAction<WriteupState> ) => {
  if ( isEditorStaffState(state) ) {
    const { payload } = action
    const content = payload.content[0]
    state.writeups.task.push({
      writeupId: payload.writeupId,
      category: payload.request.category,
      content: {
        title: content.title,
        caption: content.caption,
        phase: content.phase,
        isSubmitted: false,
        isAccepted: false,
        reSubmit: false,
        requestedResubmit: false
      }
    })
  }
}

export const resubmitTaskReducer = ( state: WritableStaffState, action: PayloadAction<string> ) => {
  if ( isEditorStaffState(state) ) {
    const index = state.writeups.task.findIndex(writeup => writeup.writeupId===action.payload)
    state.writeups.task[index].content.requestedResubmit = true
  }
}