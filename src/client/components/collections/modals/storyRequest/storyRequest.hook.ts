import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { FullStoryRequest } from "@/store/slices/storyRequests.slice"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export const useStoryRequest = ( storyRequestId: string ) =>{
  const [ storyRequest, setStoryRequest ] = useState<FullStoryRequest | null>(null)
  const modalContext = useModalContext()
  const staff = useSelectStaff()
  const query = trpc.useQuery(["storyRequest.get", { storyRequestId }], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) => {
      setStoryRequest(JSON.parse(JSON.stringify(data)))
    }
  })

  useEffect(() =>{
    query.refetch()
  }, [])

  return {
    storyRequest,
    isOwned: staff.bastionId===storyRequest?.owner.bastionId,
    isMember: storyRequest?.members?.findIndex(member => member.bastionId===staff.bastionId),
    hasRequested: storyRequest?.requests?.findIndex(member => member.bastionId===staff.bastionId),
    removeModal: modalContext.removeModal
  }
}

export const useStartStoryRequest = ( storyRequestId: string ) =>{
  const router = useRouter()
  const mutation = trpc.useMutation(["storyRequest.start"], {
    onSuccess: () =>{
      router.reload()
    }
  })

  const handleStartStoryRequest = () => {
    mutation.mutate({ storyRequestId })
  }

  return {
    handleStartStoryRequest
  }
}

export const useApplyStoryRequest = ( storyRequestId: string ) =>{
  const [ hasRequested, setHasRequested ] = useState(false)
  const mutation = trpc.useMutation(["storyRequest.apply"])

  const handleApplyStoryRequest = () => {
    setHasRequested(true)
    mutation.mutate({ storyRequestId })
  }

  return {
    hasApplied: hasRequested,
    handleApplyStoryRequest
  }
}