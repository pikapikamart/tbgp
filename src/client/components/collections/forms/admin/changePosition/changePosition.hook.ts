import { useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { Role } from "@/src/server/models/staff.model"
import { useModalContext } from "@/store/context/modal/modal"
import { useEffect } from "react"


export const useChangePositionForm = ( bastionId: string, successFunction: ( position: { name: string, role: Role } ) => void ) => {
  const { 
    addFieldRef,
    getFieldsRef,
    isValidData,
    handleFormSubmit } = useFormValidation()
    const modalContext = useModalContext()
    const mutation = trpc.useMutation(["admin.edit-staff-position"], {
      onSuccess: () => {
        const positionInput = getFieldsRef()[0]
        const position = {
          name: positionInput.dataset.name as string,
          role: positionInput.value as Role
        }
        successFunction(position)
        modalContext.removeModal()
      }
    })

    useEffect(() =>{
      if ( isValidData ) {
        const positionInput = getFieldsRef()[0]
        const position = {
          name: positionInput.dataset.name as string,
          role: positionInput.value as Role
        }

        mutation.mutate({
          bastionId,
          ...position
        })
      }
    }, [ isValidData ])

    return {
      addFieldRef,
      handleFormSubmit
    }
}