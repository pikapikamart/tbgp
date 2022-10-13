import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { Verification } from "@/src/server/models/admin.model"
import { useModalContext } from "@/store/context/modal/modal"
import { rejectStaffVerification } from "@/store/slices/admin.slice"
import { useEffect } from "react"
import { VerifyStaffModalProps } from "./verifyStaff"


type UseVerifyPositionProps = VerifyStaffModalProps

export const useVerifyPosition = ( accepted: boolean, verification: Verification ) =>{
  const mutation = trpc.useMutation(["admin.verify-position"])
  const dispatch = useAppDispatch()
  const modalContext = useModalContext()

  const handleVerifyPosition = () =>{

    if ( !verification ) {
      return
    }

    mutation.mutate({
      bastionId: verification.bastionId,
      position: verification.position,
      accepted
    })
  }

  useEffect(() =>{
    if ( mutation.data?.success && verification ) {
      dispatch(rejectStaffVerification(verification.bastionId))
      modalContext.removeModal()
    }
  }, [ mutation ])

  return {
    handleVerifyPosition
  }
}