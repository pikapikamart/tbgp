import { useFormValidation } from "@/lib/hooks"
import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { sendStaffVerification } from "@/store/slices/staff.slice"
import { useEffect } from "react"


export type PositionState = {
  name: string,
  role: string
}

export const useSendPositionRequest = () =>{
  const {
    addFieldRef,
    getFieldsRef,
    isValidData,
    handleFormSubmit
  } = useFormValidation()
  const modalContext = useModalContext()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["staff.request-position"], {
    onSuccess: () =>{
      dispatch(sendStaffVerification())
      modalContext.removeModal()
    }
  })

  useEffect(() =>{
    if ( isValidData ) {
      const positionInput = getFieldsRef()[0]
      
      mutation.mutate({
        name: positionInput.dataset.name as string,
        role: positionInput.value
      })
    }
  }, [ isValidData ])

  return {
    addFieldRef,
    handleFormSubmit,
  }
}