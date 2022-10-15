import { useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { StaffSchema } from "@/src/server/schemas/staff.schema"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useState } from "react"


type StaffBody = StaffSchema & {
  [ key: string ]: string
}

export const useSetupStaffProfile = ( bastionId: string ) =>{
  const {
    addFieldRef,
    handleFormSubmit,
    getFieldsRef,
    resetFormValidation,
    isValidData,
  } = useFormValidation()
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
    onError: ( data ) =>{
      setEmailError(data.message)
      resetFormValidation()
    }
  })

  useEffect(() =>{
    if ( isValidData ) {
      const staffData = getFieldsRef().reduce((accu, cur) =>{
        accu[cur.name] = cur.value

        return accu
      }, {} as StaffBody)
      staffData.bastionId = bastionId

      mutation.mutate(staffData)
    }
  }, [ isValidData ])


  return {
    addFieldRef,
    handleFormSubmit,
    emailError
  }
}