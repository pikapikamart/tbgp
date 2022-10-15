import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { Verification } from "@/src/server/models/admin.model"
import { useModalContext } from "@/store/context/modal/modal"
import { rejectStaffVerification } from "@/store/slices/admin.slice"


export const useVerifyPosition = ( accepted: boolean, verification: Verification ) =>{
  const dispatch = useAppDispatch()
  const modalContext = useModalContext()
  const mutation = trpc.useMutation(["admin.verify-position"], {
    onSuccess: () =>{
      dispatch(rejectStaffVerification(verification.bastionId))
      modalContext.removeModal()
    }
  })

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

  return {
    handleVerifyPosition
  }
}