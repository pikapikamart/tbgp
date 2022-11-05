import { 
  readonlyPhases, 
  versionIndex } from "@/components/collections/modals/writeup/version/utils"
import { WriteupPhases } from "@/src/server/models/writeup.model"
import { UpdateStaffSchema } from "@/src/server/schemas/staff.schema"
import { PayloadAction } from "@reduxjs/toolkit"
import { 
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
    action.payload.writeups.collaborated = action.payload.writeups.collaborated.filter(request => request)
    action.payload.writeups.solo = action.payload.writeups.solo.filter(request => request)
  }

  if ( isEditorStaffState(action.payload) ) {
    action.payload.writeups.task = action.payload.writeups.task.filter(request => request)
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

export const startStoryRequestReducer = ( state: WritableStaffState, action: PayloadAction<string> ) => {
  if ( isEditorStaffState(state) ) {
    state.storyRequests.created = state.storyRequests.created.filter(request => request.storyRequestId!==action.payload)
  }
}

export const deleteStoryRequestReducer = ( state: WritableStaffState, action: PayloadAction<string> ) => {
  if ( isEditorStaffState(state) ) {
    state.storyRequests.created = state.storyRequests.created.filter(request => request.storyRequestId!==action.payload)
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
    state.writeups.task[index].content.requestedResubmit = false
  }
}

export const addWriteupTaskReducer = ( state: WritableStaffState, action: PayloadAction<WriteupState> ) => {
  if ( isEditorStaffState(state) ) {

    const foundTaskIndex = state.writeups.task.findIndex(task => task.writeupId===action.payload.writeupId)
    if ( foundTaskIndex!==-1 ) {
      const currentTask = state.writeups.task[foundTaskIndex]
      const phaseIndex = versionIndex(currentTask.content.phase as WriteupPhases)
      currentTask.content.phase = readonlyPhases[phaseIndex+1]
      currentTask.content.isSubmitted = false

      return
    }

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
    const index = state.writeups.task.findIndex(writeup => writeup && writeup.writeupId===action.payload)
    state.writeups.task[index].content.requestedResubmit = true
  }
}

export const publishWriteupReducer = ( state: WritableStaffState, action: PayloadAction<string> ) => {
  if ( isEditorStaffState(state) ) {
    state.writeups.task = state.writeups.task.filter(task => task.writeupId!==action.payload)
  }
}