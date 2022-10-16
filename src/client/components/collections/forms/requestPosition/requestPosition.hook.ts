import { trpc } from "@/lib/trpc"
import { useState } from "react"



export const useSendPositionRequest = () =>{
  const mutation = trpc.useMutation(["staff.request-position"])
  const [ position, setPosition ] = useState("")

  const handlePositionRequest = ( event: React.FormEvent ) =>{
    event.preventDefault()

    mutation.mutate({
      position
    })
  }

  const handleSetPosition = ( position: string ) => {
    setPosition(position)
  }

  return {
    handleSetPosition,
    handlePositionRequest
  }
}