import { useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { 
  useEffect, 
  useState } from "react"
import { BaseModal } from "@/components/shared/modal"
import { SetupStaffProfileModal } from "@/components/collections/modals/staff/setupProfile"


export const useSignupValidation = () => {
  const {
    addFieldRef,
    handleFormSubmit,
    ariaLive,
    resetFormValidation,
    getFieldsRef,
    isValidData
  } = useFormValidation()
  const [ bastionId, setBastionId ] = useState("")
  const [ shouldFetch, setShouldFetch ] = useState(false)
  const query = trpc.useQuery(["staff.validate-bastionId", bastionId], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: () => {
      modalContext.addModal(
        <BaseModal>
          <SetupStaffProfileModal bastionId={ bastionId } />
        </BaseModal>
      )
      resetFormValidation()
    },
    onError: () => {
      resetFormValidation()
    }
  })
  const modalContext = useModalContext()

  useEffect(() =>{
    if ( isValidData ) {
      setBastionId(getFieldsRef()[0].value.trim())
      setShouldFetch(true)
    }
  }, [ isValidData ])

  useEffect(() =>{
    if ( shouldFetch ) {
      query.refetch()
      setShouldFetch(false)
    }
  }, [ shouldFetch ])

  return {
    addFieldRef,
    handleFormSubmit,
    bastionId,
    ariaLive
  }
}