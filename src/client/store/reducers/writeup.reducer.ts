import { 
  readonlyPhases, 
  versionIndex } from "@/components/collections/modals/writeup/version/utils"
import { HeaderFields } from "@/components/staff/writeup/write/header/header.hook"
import { PopulatedWriteup } from "@/src/server/controllers/writeup.controller"
import { PayloadAction } from "@reduxjs/toolkit"
import type { Draft, WritableDraft } from "immer/dist/internal"
import { Descendant } from "slate"
import { StaffState } from "../slices/staff.slice"
import { WriteupState } from "../slices/writeup.slice"
import io from "socket.io-client"


export type DraftWriteupState = WritableDraft<WriteupState>

export const setWriteupReducer = ( state: DraftWriteupState, action: PayloadAction<PopulatedWriteup> ) => {
  state = Object.assign(state, action.payload)
}

export const setShouldSaveReducer = ( state: DraftWriteupState ) => {
  state.shouldSave = true
}

export const setWriteupHeadingReducer = ( state: DraftWriteupState, action: PayloadAction<HeaderFields> ) =>{
  state.content[0].title = action.payload.title
  state.content[0].caption = action.payload.caption
  state.isHeadingValid = true
}

export const setWriteupSlateReducer = ( state: DraftWriteupState, action: PayloadAction<Descendant[]> ) =>{
  state.content[0].data = action.payload
  state.isSlateValid = true
}

export const resetSubmissionReducer = ( state: DraftWriteupState ) =>{
  state.isHeadingValid = false
  state.isSlateValid = false
  state.shouldSave = false
}

export const addMemberSubmissionReducer = ( state: DraftWriteupState, action: PayloadAction<StaffState> ) => {
  if ( state.currentPhase==="writeup" && state.content[0].submissions ) {
    state.content[0].submissions.push({
      username: action.payload.username,
      firstname: action.payload.firstname,
      lastname: action.payload.lastname,
      bastionId: action.payload.bastionId
    })
  }
}

export const removeMemberSubmissionReducer = ( state: DraftWriteupState, action: PayloadAction<string> ) => {
  if ( state.currentPhase==="writeup" && state.content[0].submissions ) {
    state.content[0].submissions = state.content[0].submissions.filter(member => member.bastionId!==action.payload)
  }
}

export const submitWriteupReducer = ( state: DraftWriteupState ) => {
  state.currentPhase = readonlyPhases[versionIndex(state.currentPhase)+1]
  state.content[0].isSubmitted = true
}
 
export const resetWriteupReducer = ( state: DraftWriteupState ) => {
  state.writeupId = ""
}

export const takeWriteupTaskReducer = ( state: DraftWriteupState, action: PayloadAction<StaffState> ) => {
  const {
    firstname,
    lastname,
    username,
    bastionId
  } = action.payload
  state.content[0].handledBy = {
    firstname,
    lastname,
    username,
    bastionId
  }
}

export const resubmitWriteupReducer = ( state: DraftWriteupState ) => {
  state.content[0].requestedResubmit = true
}

export type WriteupBanner = {
  url: string,
  caption: string
}

export const addWriteupBannerReducer = ( state: DraftWriteupState, action: PayloadAction<WriteupBanner> ) => {
  state.banner = action.payload
}

export const startCollaboratingReducer = ( state: DraftWriteupState, action: PayloadAction<string> ) => {
  let socket = state.socket

  if ( !socket ) {
    // writable draft check
    // @ts-ignore
    socket = io(action.payload)
  }

  state.socket = socket
}

export const stopCollaboratingReducer = ( state: DraftWriteupState ) => {
  state.socket = undefined
}