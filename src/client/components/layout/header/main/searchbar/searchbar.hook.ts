import { 
  useExpansion, 
  useFormValidation } from "@/lib/hooks"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useSearchbar = () =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const { 
    handleFormSubmit,
    addFieldRef,
    getFieldsRef,
    resetFormValidation,
    isValidData } = useFormValidation()
  const router = useRouter()

  useEffect(() =>{
    if ( isValidData ) {
      resetFormValidation()
      const input = getFieldsRef()[0]
      router.push("/search?query=" + input.value)
    }
  }, [ isValidData ])

  return {
    isExpanded,
    handleExpansion,
    handleFormSubmit,
    addFieldRef,
  }
}