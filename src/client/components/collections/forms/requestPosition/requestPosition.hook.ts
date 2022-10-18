import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { useState } from "react"


export type PositionState = {
  name: string,
  role: string
}

export const useSendPositionRequest = () =>{
  const router = useRouter()
  const mutation = trpc.useMutation(["staff.request-position"], {
    onSuccess: () =>{
      router.reload()
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