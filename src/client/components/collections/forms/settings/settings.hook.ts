import { useFormValidation } from "@/lib/hooks"
import { trpc } from "@/lib/trpc"
import { UpdateStaffSchema } from "@/src/server/schemas/staff.schema"
import { useRouter } from "next/router"
import { useEffect } from "react"


type StaffBody = UpdateStaffSchema & {
  [ key: string ] : string
}

export const useUpdateSettings = ( username: string ) =>{
  const {
    addFieldRef,
    isValidData,
    handleFormSubmit,
    getFieldsRef
  } = useFormValidation()
  const router = useRouter()
  const mutation = trpc.useMutation(["staff.edit"], {
    onSuccess: () =>{
      router.replace(`/storybuilder/${ username }`)
    }
  })

  useEffect(() => {
    if ( isValidData ) {
      const userData = getFieldsRef().reduce((accu, cur) =>{
        accu[cur.name] = cur.value

        return accu
      }, {} as StaffBody)
      
      mutation.mutate(userData)
    }
  }, [ isValidData ])

  return {
    addFieldRef,
    getFieldsRef,
    handleFormSubmit
  }
}