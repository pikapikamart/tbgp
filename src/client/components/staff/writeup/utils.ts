import { WriteupState } from "@/store/slices/writeup.slice"


export const isWriteupMember = ( writeup: WriteupState, bastionId: string ) =>{
  return writeup.request.members.find(member => member.bastionId===bastionId)!==undefined
}

export const isWriteupPhaseEditable = ( writeup: WriteupState, bastionId: string ) => {
  return writeup.currentPhase==="writeup" && isWriteupMember(writeup, bastionId)
}

export const isWriteupCollaborative = ( writeup: WriteupState ) => {
  return writeup.request.members.length > 1
}

export const isWriteupPartSubmitted= ( writeup: WriteupState, bastionId: string ) => {
  return writeup.content[0].submissions?.find(member => member.bastionId===bastionId)!==undefined
}

export const isCollaborativePartDone = ( writeup: WriteupState, bastionId: string ) => {
  return writeup.currentPhase==="writeup" && isWriteupCollaborative(writeup) && isWriteupPartSubmitted(writeup, bastionId)
}

export const isWriteupEditable = ( writeup: WriteupState ) =>{
  return !writeup.content[0].isSubmitted
}

export const isWriteupRequestingSubmission = ( writeup: WriteupState ) =>{
  return writeup.content[0].requestedResubmit
}

export const isWriteupHandler = ( writeup: WriteupState, bastionId: string ) =>{
  return writeup.content[0].handledBy?.bastionId===bastionId
}

export const isWriteupReadonly = ( writeup: WriteupState, bastionId: string ) => {
  return !((isWriteupPhaseEditable(writeup, bastionId) || isWriteupHandler(writeup, bastionId)) && isWriteupEditable(writeup) && !isWriteupRequestingSubmission(writeup))
}

export const isWriteupResubmit = ( writeup: WriteupState ) => {
  return writeup.content[0].requestedResubmit || writeup.content[0].reSubmit
}

export const isWriteupGraphicsAvailable = ( writeup: WriteupState ) => {
  return writeup.content[0].phase==="graphics" || writeup.content[0].phase==="finalization"
}