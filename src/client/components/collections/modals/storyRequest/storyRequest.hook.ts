import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { FullStoryRequest } from "@/store/slices/storyRequests.slice"
import { useRouter } from "next/router"
import { useState } from "react"


export const useStoryRequest = ( storyRequestId: string ) =>{
  const [ storyRequest, setStoryRequest ] = useState<FullStoryRequest | null>(null)
  const router = useRouter()
  const modalContext = useModalContext()
  const staff = useSelectStaff()
  trpc.useQuery(["storyRequest.get", { storyRequestId }], {
    onSuccess: ({ data }) => {
      setStoryRequest(JSON.parse(JSON.stringify(data)))
    }
  })
  const startMutation = trpc.useMutation(["storyRequest.start"],{
    onSuccess: () =>{
      router.reload()
    }
  })

  const handleStartStoryRequest = () => {
    startMutation.mutate({ storyRequestId })
  }

  const handleApplyStoryRequest = () => {

  }

  return {
    storyRequest,
    isOwned: staff.bastionId===storyRequest?.owner.bastionId,
    handleStartStoryRequest,
    handleApplyStoryRequest,
    removeModal: modalContext.removeModal
  }
}