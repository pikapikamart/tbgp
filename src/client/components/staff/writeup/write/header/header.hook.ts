import { useFormValidation } from "@/lib/hooks"
import { 
  useAppDispatch,
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { 
  resetSubmission, 
  setWriteupHeading } from "@/store/slices/writeup.slice"
import React, { 
  useEffect, 
  useRef } from "react"
import { SocketEvents } from "@/components/staff/writeup/phase.hook"


export type HeaderFields = {
  [ key: string ]: string,
  title: string,
  caption: string
}

export const useWriteupHeader = () =>{
  const writeup = useSelectWriteup()
  const dispatch = useAppDispatch()
  const staff = useSelectStaff()
  const {
    getFieldsRef,
    addFieldRef,
    handleFormSubmit,
    isValidData,
    isInvalidData,
    resetFormValidation,
  } = useFormValidation()
  const submitFormRef = useRef<HTMLButtonElement | null>(null)
  const titleRef = useRef<HTMLTextAreaElement | null>(null)
  const captionRef = useRef<HTMLTextAreaElement | null>(null)

  const handleTextareaResize = ( { currentTarget }: React.FormEvent<HTMLTextAreaElement> ) => {
    currentTarget.style.height = "0"
    currentTarget.style.height = currentTarget.scrollHeight + "px"
  }

  const handleEmitTitle = ( event: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const { socket } = writeup

    if ( socket ) {
      socket.emit(SocketEvents.clients.emit_title, {
        writeup: writeup.writeupId,
        title: event.currentTarget.value
      })
    }
  }

  const handleEmitCaption = ( event: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const { socket } = writeup

    if ( socket ) {
      socket.emit(SocketEvents.clients.emit_caption, {
        writeup: writeup.writeupId,
        caption: event.currentTarget.value
      })
    }
  }

  useEffect(() =>{
    if ( writeup.socket ) {
      const socket  = writeup.socket

      socket.on(SocketEvents.server.broadcast_title, ( title: string ) => {
        if ( titleRef.current ) {
          titleRef.current.value = title
          titleRef.current.style.height = "0"
          titleRef.current.style.height = titleRef.current.scrollHeight + "px"
        }
      })

      socket.on(SocketEvents.server.broadcast_caption, ( caption: string ) => {
        if ( captionRef.current ) {
          captionRef.current.value = caption
          captionRef.current.style.height = "0"
          captionRef.current.style.height = captionRef.current.scrollHeight + "px"
        }
      })
    }
  }, [ writeup.socket ])

  useEffect(() =>{
    if ( writeup.shouldSave && submitFormRef.current ) {
      submitFormRef.current.click()
    }
  }, [ writeup.shouldSave ])

  useEffect(() =>{
    if ( isValidData ) {
      
      const fields = getFieldsRef().reduce((accu, curr) =>{
        accu[curr.name] = curr.value.trim()

        return accu
      }, {} as HeaderFields)
      
      dispatch(setWriteupHeading(fields))
      resetFormValidation()
    }
  }, [ isValidData ])

  useEffect(() =>{
    if ( isInvalidData ) {
      resetFormValidation()
      dispatch(resetSubmission())
    }
  }, [ isInvalidData ])

  return {
    writeup,
    staff,
    addFieldRef,
    submitFormRef,
    handleFormSubmit,
    handleTextareaResize,
    titleRef,
    captionRef,
    handleEmitTitle,
    handleEmitCaption,
  }
}