import { WriteupState } from "@/store/slices/writeup.slice"


export const isWriteupMember = ( writeup: WriteupState, bastionId: string ) =>{
  return writeup.request.members.find(member => member.bastionId===bastionId)!==undefined
}

export const isWriteupEditable = ( writeup: WriteupState ) =>{
  return !writeup.content[0].isSubmitted
}

export const isWriteupHandler = ( writeup: WriteupState, bastionId: string ) =>{
  return writeup.content[0].handledBy?.bastionId===bastionId
}