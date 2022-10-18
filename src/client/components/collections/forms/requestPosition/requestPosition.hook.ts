import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { sendStaffVerification } from "@/store/slices/staff.slice"
import { useRouter } from "next/router"
import { useState } from "react"


export type PositionState = {
  name: string,
  role: string
}

export const useSendPositionRequest = () =>{
  const router = useRouter()
  const modalContext = useModalContext()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["staff.request-position"], {
    onSuccess: () =>{
      dispatch(sendStaffVerification())
      modalContext.removeModal()
    }
  })
  const [ position, setPosition ] = useState<PositionState>({
    name: "",
    role: ""
  })

  const handlePositionRequest = ( event: React.FormEvent ) =>{
    event.preventDefault()

    if ( !position.name && !position.role ) {
      return
    }

    mutation.mutate(position)
  }

  const handleSetPosition = ( position: PositionState ) => {
    setPosition(position)
  }

  return {
    handleSetPosition,
    handlePositionRequest
  }
}