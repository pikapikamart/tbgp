import { useFormValidation } from "@/lib/hooks"
import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { UpdateStaffSchema } from "@/src/server/schemas/staff.schema"
import { updateStaff } from "@/store/slices/staff.slice"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"


type UpdateStaffBody = UpdateStaffSchema & {
  [ key: string ] : string
}

export const useUpdateSettings = ( username: string ) =>{
  const {
    addFieldRef,
    isValidData,
    handleFormSubmit,
    getFieldsRef
  } = useFormValidation()
  const updateStaffRef = useRef<UpdateStaffBody>({
    firstname: "",
    lastname: "",
    bio: ""
  })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["staff.edit"], {
    onSuccess: () =>{
      dispatch(updateStaff(updateStaffRef.current))
      router.replace(`/storybuilder/${ username }`)
    }
  })
  
  useEffect(() => {
    if ( isValidData ) {
      const userData = getFieldsRef().reduce((accu, cur) =>{
        accu[cur.name] = cur.value.trim()

        return accu
      }, {} as UpdateStaffBody)
      
      updateStaffRef.current = userData
      mutation.mutate(userData)
    }
  }, [ isValidData ])

  return {
    addFieldRef,
    getFieldsRef,
    handleFormSubmit
  }
}