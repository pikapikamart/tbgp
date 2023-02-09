import { useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { Role } from "@/src/server/models/staff.model"
import { useModalContext } from "@/store/context/modal/modal"
import { useEffect } from "react"


export const useChangePositionForm = ( bastionId: string, successFunction: () => void ) => {
  const { 
    addFieldRef,
    getFieldsRef,
    isValidData,
    handleFormSubmit } = useFormValidation()
    const modalContext = useModalContext()
    const mutation = trpc.useMutation(["admin.edit-staff-position"], {
      onSuccess: () => {
        successFunction()
        modalContext.removeModal()
      }
    })

    useEffect(() =>{
      if ( isValidData ) {
        const positionInput = getFieldsRef()[0]

        mutation.mutate({
          bastionId,
          name: positionInput.dataset.name as string,
          role: positionInput.value as Role
        })
      }
    }, [ isValidData ])

    return {
      addFieldRef,
      handleFormSubmit
    }
}