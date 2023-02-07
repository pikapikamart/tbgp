import { 
  HandleFormSubmit, 
  useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { addErrors } from "@/lib/utils"
import { StaffSchema } from "@/src/server/schemas/staff.schema"
import { signIn } from "next-auth/react"
import { 
  useEffect, 
  useState } from "react"


type StaffBody = StaffSchema & {
  [ key: string ]: string,
  passwordConfirm: string
}

export const useSetupStaffProfile = ( bastionId: string ) =>{
  const {
    addFieldRef,
    handleFormSubmit,
    getFieldsRef,
    resetFormValidation,
    isValidData,
  } = useFormValidation()
  const [ passwordError, setPasswordError ] = useState(false)
  const [ emailError, setEmailError ] = useState("")
  const mutation = trpc.useMutation(["staff.register"], {
    onSuccess: ( data ) => {
      signIn("credentials", {
        email: data.data.email,
        password: data.data.password,
        userType: "staff",
        callbackUrl: "/storybuilder"
      })
    },
    onError: ( error ) =>{
      const [, , ,email] = getFieldsRef()
      addErrors(email)
      setEmailError(error.message)
      resetFormValidation()
    }
  })

  const handleSubmitSignupForm: HandleFormSubmit = ( event ) => {
    handleFormSubmit(event)
    setEmailError("")
  }

  useEffect(() =>{
    if ( isValidData ) {
      const staffData = getFieldsRef().reduce((accu, cur) =>{
        accu[cur.name] = cur.value.trim()

        return accu
      }, {} as StaffBody)
      staffData.bastionId = bastionId
      const { password, passwordConfirm } = staffData

      if ( password!==passwordConfirm ) {
        const [ , , , , , passwordConfirmInput] = getFieldsRef()
        addErrors(passwordConfirmInput)
        setPasswordError(true)
        resetFormValidation()
      } else {
        setPasswordError(false)
        const { passwordConfirm, ...rest } = staffData
        mutation.mutate(rest)
      }
      
    }
  }, [ isValidData ])


  return {
    addFieldRef,
    handleSubmitSignupForm,
    passwordError,
    isLoading: mutation.isLoading,
    emailError
  }
}