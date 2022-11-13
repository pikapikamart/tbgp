import { HandleFormSubmit, useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { 
  useEffect, 
  useState } from "react"
import { BaseModal } from "@/components/shared/modal"
import { SetupStaffProfileModal } from "@/components/collections/modals/staff/setupProfile"
import { addErrors } from "@/lib/utils"


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
  const [ idError, setIdError ] = useState("")
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
    onError: ( error ) => {
      addErrors(getFieldsRef()[0])
      setIdError(error.message)
      resetFormValidation()
    }
  })
  const modalContext = useModalContext()

  const handleSignup: HandleFormSubmit = ( event ) => {
    setIdError("")
    handleFormSubmit(event)
  }

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
    handleFormSubmit: handleSignup,
    bastionId,
    ariaLive,
    idError,
    isLoading: query.isLoading
  }
}