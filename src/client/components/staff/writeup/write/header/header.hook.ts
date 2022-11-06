import { useFormValidation } from "@/lib/hooks"
import { 
  useAppDispatch,
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { resetSubmission, setWriteupHeading } from "@/store/slices/writeup.slice"
import React, { 
  useEffect, 
  useRef } from "react"


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

  const handleTextareaResize = ( { currentTarget }: React.FormEvent<HTMLTextAreaElement> ) => {
    currentTarget.style.height = "0"
    currentTarget.style.height = currentTarget.scrollHeight + "px"
  }

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
    handleTextareaResize
  }
}