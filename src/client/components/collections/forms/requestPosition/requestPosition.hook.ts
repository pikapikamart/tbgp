import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { useState } from "react"


export const useSendPositionRequest = () =>{
  const router = useRouter()
  const mutation = trpc.useMutation(["staff.request-position"], {
    onSuccess: () =>{
      router.reload()
    }
  })
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