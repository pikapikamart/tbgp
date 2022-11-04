import { useFormValidation } from "@/lib/hooks"
import { 
  useAppDispatch,
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { setWriteupHeading } from "@/store/slices/writeup.slice"
import { 
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
    resetFormValidation,
  } = useFormValidation()
  const submitFormRef = useRef<HTMLButtonElement | null>(null)

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

  return {
    writeup,
    staff,
    addFieldRef,
    submitFormRef,
    handleFormSubmit
  }
}